import React from 'react';
import { Button, Badge, Card, CardHeader, CardTitle, CardContent, PriceDisplay } from '@ecobazar/ui';
import {
  Store,
  Layers,
  Clock,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  FileText,
  Settings,
  ChevronDown,
  MonitorCheck,
  Building2,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const branches = [
    { id: '1', name: 'Dhanmondi Branch #01 (Main)' },
    { id: '2', name: 'Gulshan Branch #02' },
    { id: '3', name: 'Uttara Branch #03' },
  ];

  const stats = [
    {
      title: "Today's Gross Sales",
      value: 184500,
      isPrice: true,
      change: '+14.2% from yesterday',
      icon: TrendingUp,
      color: 'text-emerald-600',
    },
    {
      title: 'Active FEFO Batches',
      value: 1240,
      isPrice: false,
      change: 'Across all departments',
      icon: Layers,
      color: 'text-blue-600',
    },
    {
      title: 'Near-Expiry Alerts (30d)',
      value: 18,
      isPrice: false,
      change: 'Requires markdown action',
      icon: AlertTriangle,
      color: 'text-amber-500',
    },
    {
      title: 'Active POS Registers',
      value: 6,
      isPrice: false,
      change: 'All drawers balanced',
      icon: MonitorCheck,
      color: 'text-ecobazar-primary-green',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-20261116-081',
      channel: 'POS_STORE',
      branch: 'Dhanmondi #01',
      items: 4,
      total: 1240,
      status: 'COMPLETED',
      time: '12:42 PM',
    },
    {
      id: 'ORD-20261116-080',
      channel: 'ONLINE_WEB',
      branch: 'Gulshan #02',
      items: 8,
      total: 3450,
      status: 'PROCESSING',
      time: '12:35 PM',
    },
    {
      id: 'ORD-20261116-079',
      channel: 'POS_STORE',
      branch: 'Dhanmondi #01',
      items: 2,
      total: 580,
      status: 'COMPLETED',
      time: '12:28 PM',
    },
    {
      id: 'ORD-20261116-078',
      channel: 'ONLINE_APP',
      branch: 'Uttara #03',
      items: 12,
      total: 5120,
      status: 'OUT_FOR_DELIVERY',
      time: '12:15 PM',
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-ecobazar-forest-green text-white flex flex-col shrink-0">
        <div className="p-5 border-b border-emerald-900/50 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-ecobazar-primary-green flex items-center justify-center font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="font-bold text-base leading-none">ECOBAZAR</h1>
            <span className="text-[10px] text-emerald-300 tracking-wider uppercase font-semibold">
              Retail OS
            </span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 text-sm font-medium">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-800/60 text-white"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <Store className="h-4 w-4" />
            <span>Branches</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <Layers className="h-4 w-4" />
            <span>Inventory & FEFO</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Point of Sale (POS)</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <FileText className="h-4 w-4" />
            <span>Orders & Delivery</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <Building2 className="h-4 w-4" />
            <span>Suppliers & PO</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-emerald-900/40 hover:text-white transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-emerald-900/50">
          <Button variant="orange" size="sm" className="w-full gap-2">
            <MonitorCheck className="h-4 w-4" />
            <span>Launch POS Terminal</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500 font-medium">Branch Scope:</span>
            <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer">
              <Store className="h-3.5 w-3.5 text-ecobazar-forest-green" />
              <span>{branches[0].name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="mint">Currency: BDT (৳)</Badge>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                MK
              </div>
              <div className="text-xs">
                <p className="font-semibold text-slate-800">Mohammad Karim</p>
                <p className="text-[10px] text-slate-500">Super Admin / Owner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Executive Overview</h2>
            <p className="text-xs text-slate-500">Real-time consolidated analytics across store branches.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx}>
                  <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-medium text-slate-500">{stat.title}</CardTitle>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.isPrice ? (
                        <PriceDisplay amount={stat.value as number} size="xl" />
                      ) : (
                        (stat.value as number).toLocaleString()
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Orders Table */}
          <Card>
            <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Live Omnichannel Transactions</CardTitle>
                <p className="text-xs text-slate-500">In-store POS and online express deliveries.</p>
              </div>
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 border-y border-slate-200 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-5">Order ID</th>
                      <th className="py-3 px-5">Channel</th>
                      <th className="py-3 px-5">Branch</th>
                      <th className="py-3 px-5">Items</th>
                      <th className="py-3 px-5">Total</th>
                      <th className="py-3 px-5">Status</th>
                      <th className="py-3 px-5">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-5 font-semibold text-slate-900">{ord.id}</td>
                        <td className="py-3 px-5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.channel === 'POS_STORE'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {ord.channel}
                          </span>
                        </td>
                        <td className="py-3 px-5 text-slate-600">{ord.branch}</td>
                        <td className="py-3 px-5 text-slate-600">{ord.items} items</td>
                        <td className="py-3 px-5 font-bold">
                          <PriceDisplay amount={ord.total} size="sm" />
                        </td>
                        <td className="py-3 px-5">
                          <Badge variant={ord.status === 'COMPLETED' ? 'default' : 'orange'}>
                            {ord.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-5 text-slate-500">{ord.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
