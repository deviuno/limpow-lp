import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Users, 
  MousePointerClick,
  TrendingUp,
  TrendingDown,
  Loader2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { supabase } from '../../lib/supabase';

/*
const data = [
  { name: '01/02', views: 4000, visitors: 2400 },
  { name: '02/02', views: 3000, visitors: 1398 },
  { name: '03/02', views: 2000, visitors: 9800 },
  { name: '04/02', views: 2780, visitors: 3908 },
  { name: '05/02', views: 1890, visitors: 4800 },
  { name: '06/02', views: 2390, visitors: 3800 },
  { name: '07/02', views: 3490, visitors: 4300 },
];
*/

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
      const prevPeriodStart = new Date(thirtyDaysAgo);
      prevPeriodStart.setDate(prevPeriodStart.getDate() - 30);
      
      // Fetch total CTA clicks
      const { count: totalClicks } = await supabase
        .from('cta_clicks')
        .select('*', { count: 'exact' });

      // Fetch recent CTA clicks
      const { count: recentClicks } = await supabase
        .from('cta_clicks')
        .select('*', { count: 'exact' })
        .gte('clicked_at', thirtyDaysAgo.toISOString());

      const { count: prevPeriodClicks } = await supabase
        .from('cta_clicks')
        .select('*', { count: 'exact' })
        .gte('clicked_at', prevPeriodStart.toISOString())
        .lt('clicked_at', thirtyDaysAgo.toISOString());

      const clicksChange = prevPeriodClicks > 0 
        ? ((recentClicks - prevPeriodClicks) / prevPeriodClicks * 100).toFixed(1)
        : 100;

      // Fetch total views
      const { count: totalViews } = await supabase
        .from('posts_views')
        .select('*', { count: 'exact' });

      // Fetch views from last 30 days
      const { count: recentViews } = await supabase
        .from('posts_views')
        .select('*', { count: 'exact' })
        .gte('viewed_at', thirtyDaysAgo.toISOString());

      // Fetch total published posts
      const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      // Fetch posts published in last 30 days
      const { count: recentPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .gte('published_at', thirtyDaysAgo.toISOString());

      const { count: prevPeriodViews } = await supabase
        .from('posts_views')
        .select('*', { count: 'exact' })
        .gte('viewed_at', prevPeriodStart.toISOString())
        .lt('viewed_at', thirtyDaysAgo.toISOString());

      const viewsChange = prevPeriodViews > 0 
        ? ((recentViews - prevPeriodViews) / prevPeriodViews * 100).toFixed(1)
        : 100;

      const newStats = [
        {
          title: 'Visualizações Totais',
          value: totalViews.toLocaleString('pt-BR'),
          change: `${viewsChange}%`,
          trend: viewsChange >= 0 ? 'up' : 'down',
          icon: Eye
        },
        {
          title: 'Visualizações (30d)',
          value: recentViews.toLocaleString('pt-BR'),
          change: 'Últimos 30 dias',
          trend: 'up',
          icon: Eye
        },
        {
          title: 'Cliques no CTA',
          value: totalClicks.toLocaleString('pt-BR'),
          change: `${clicksChange}%`,
          trend: 'up',
          icon: MousePointerClick
        },
        {
          title: 'Cliques Recentes',
          value: recentClicks.toLocaleString('pt-BR'),
          change: 'Últimos 30 dias', 
          trend: 'up',
          icon: MousePointerClick
        }
      ];
      setStats(newStats);

      // Fetch daily views for chart
      const { data: viewsData, error: viewsError } = await supabase
        .from('posts_views')
        .select('viewed_at')
        .gte('viewed_at', sevenDaysAgo.toISOString());

      if (viewsError) throw viewsError;

      // Process chart data
      const dailyViews = viewsData.reduce((acc, view) => {
        const date = new Date(view.viewed_at).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit'
        });
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(dailyViews).map(([date, views]) => ({
        name: date,
        views
      })).sort((a, b) => {
        const [dayA, monthA] = a.name.split('/');
        const [dayB, monthB] = b.name.split('/');
        return new Date(2024, monthA - 1, dayA) - new Date(2024, monthB - 1, dayB);
      });

      setChartData(chartData);

      // Fetch top posts
      const { data: topPostsData } = await supabase
        .from('posts')
        .select('id, title, views, published_at')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(4);

      setTopPosts(topPostsData || []);

      // Fetch recent posts
      const { data: recentPostsData } = await supabase
        .from('posts')
        .select('id, title, views, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(4);

      setRecentPosts(recentPostsData || []);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-[#11CD80] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do desempenho do blog</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#11CD80]/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#11CD80]" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Desempenho dos Últimos 7 Dias</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#11CD80" 
                name="Visualizações"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Artigos Mais Vistos</h2>
          <div className="space-y-4">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">{post.title}</p>
                    <span className="text-sm text-gray-500">{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{post.views || 0} visualizações</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Últimos Artigos</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{post.title}</p>
                  <p className="text-sm text-gray-600">{formatDate(post.published_at)}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>{post.views || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;