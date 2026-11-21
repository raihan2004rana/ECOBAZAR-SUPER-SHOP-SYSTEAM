'use client';

import * as React from 'react';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Avatar,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DataTable,
  Pagination,
  Breadcrumb,
  Skeleton,
  EmptyState,
  ConfirmationDialog,
  PriceDisplay,
  LoadingSpinner,
  ToastProvider,
  useToast,
} from '@ecobazar/ui';
import {
  ShoppingBag,
  Bell,
  Trash2,
  Edit,
  ExternalLink,
  Plus,
  Home,
  Layers,
  ChevronRight,
  Filter,
  RefreshCw,
  Search,
  Check,
} from 'lucide-react';

interface SampleProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const sampleProducts: SampleProduct[] = [
  { id: '1', name: 'Fresh Organic Mango (Himsagar)', category: 'Fruits', price: 420, stock: 85, status: 'In Stock' },
  { id: '2', name: 'Pure Mustard Oil 1L (Ghani)', category: 'Grocery & Staples', price: 290, stock: 120, status: 'In Stock' },
  { id: '3', name: 'Miniket Rice Premium 25kg', category: 'Rice & Grains', price: 1850, stock: 14, status: 'Low Stock' },
  { id: '4', name: 'Organic Cow Milk 1L', category: 'Dairy & Eggs', price: 95, stock: 42, status: 'In Stock' },
  { id: '5', name: 'Farm Fresh Broiler Chicken 1kg', category: 'Meat & Poultry', price: 190, stock: 0, status: 'Out of Stock' },
];

function ShowcaseContent() {
  const { toast } = useToast();

  // Interactive States
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [radioValue, setRadioValue] = React.useState('dhanmondi');
  const [activeTab, setActiveTab] = React.useState('overview');
  const [sortBy, setSortBy] = React.useState<string>('price');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedProducts = React.useMemo(() => {
    return [...sampleProducts].sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortBy, sortDirection]);

  return (
    <div className="min-h-screen bg-[#F7F9F5] text-neutral-900 font-sans pb-24">
      {/* Top Banner */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-900 text-white font-bold text-xl shadow-xs">
              E
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-forest-900">
                ECOBAZAR Design System
              </h1>
              <p className="text-xs text-neutral-500 font-medium">
                Phase 01 / Step 05 — Premium Enterprise Component Library
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="mint" dot>
              System Active
            </Badge>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ExternalLink className="h-4 w-4" />}
              onClick={() => window.open('/', '_blank')}
            >
              Customer App
            </Button>
            <Button
              variant="forest"
              size="sm"
              leftIcon={<Bell className="h-4 w-4" />}
              onClick={() => toast.success('Notification trigger verified!', 'System is operational.')}
            >
              Test Notification
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 pt-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'ECOBAZAR', href: '/', icon: <Home className="h-4 w-4" /> },
            { label: 'Architecture', href: '#' },
            { label: 'Design System & Tokens', isCurrent: true },
          ]}
        />

        {/* Hero Section */}
        <section className="rounded-2xl border border-mint-200 bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 p-8 text-white shadow-xl">
          <div className="max-w-3xl space-y-3">
            <Badge variant="warning" className="bg-amber-400 text-amber-950 font-semibold">
              Enterprise Grade UI Architecture
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              ECOBAZAR Unified Design Language
            </h2>
            <p className="text-base text-mint-100/90 leading-relaxed">
              Designed specifically for multi-branch retail operating systems in Bangladesh. Featuring strict WCAG 2.1 AA contrast, native bilingual support (English & Bangla Hind Siliguri), BDT (৳) currency localization, and full accessibility.
            </p>
          </div>
        </section>

        {/* 1. Color Palette Tokens */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">1. Brand & Semantic Color Tokens</h2>
            <p className="text-sm text-neutral-500">
              Cohesive color foundation matching the ECOBAZAR master brand identity.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="h-16 w-full rounded-lg bg-[#123C2D] mb-3 shadow-inner" />
              <p className="font-semibold text-sm text-neutral-900">Forest Green</p>
              <p className="text-xs font-mono text-neutral-500">#123C2D</p>
              <p className="text-[11px] text-neutral-400 mt-1">Primary Brand Accent</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="h-16 w-full rounded-lg bg-[#21A366] mb-3 shadow-inner" />
              <p className="font-semibold text-sm text-neutral-900">Primary Green</p>
              <p className="text-xs font-mono text-neutral-500">#21A366</p>
              <p className="text-[11px] text-neutral-400 mt-1">Actions & Highlights</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="h-16 w-full rounded-lg bg-[#D8F3DC] border border-mint-300 mb-3 shadow-inner" />
              <p className="font-semibold text-sm text-neutral-900">Mint</p>
              <p className="text-xs font-mono text-neutral-500">#D8F3DC</p>
              <p className="text-[11px] text-neutral-400 mt-1">Subtle Badges & Surface</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="h-16 w-full rounded-lg bg-[#F7F9F5] border border-neutral-300 mb-3 shadow-inner" />
              <p className="font-semibold text-sm text-neutral-900">Off White</p>
              <p className="text-xs font-mono text-neutral-500">#F7F9F5</p>
              <p className="text-[11px] text-neutral-400 mt-1">Canvas Background</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="h-16 w-full rounded-lg bg-[#F4A340] mb-3 shadow-inner" />
              <p className="font-semibold text-sm text-neutral-900">Accent Orange</p>
              <p className="text-xs font-mono text-neutral-500">#F4A340</p>
              <p className="text-[11px] text-neutral-400 mt-1">Promotions & Badges</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="rounded-xl border border-success-200 bg-success-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-3 w-3 rounded-full bg-success-500" />
                <span className="font-semibold text-sm text-success-900">Success</span>
              </div>
              <p className="text-xs text-success-700">Completed, Verified, Active</p>
            </div>
            <div className="rounded-xl border border-warning-200 bg-warning-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-3 w-3 rounded-full bg-warning-500" />
                <span className="font-semibold text-sm text-warning-900">Warning</span>
              </div>
              <p className="text-xs text-warning-700">Low Stock, Expiring, Caution</p>
            </div>
            <div className="rounded-xl border border-error-200 bg-error-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-3 w-3 rounded-full bg-error-500" />
                <span className="font-semibold text-sm text-error-900">Error</span>
              </div>
              <p className="text-xs text-error-700">Out of Stock, Failed, Cancelled</p>
            </div>
            <div className="rounded-xl border border-info-200 bg-info-50 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-3 w-3 rounded-full bg-info-500" />
                <span className="font-semibold text-sm text-info-900">Information</span>
              </div>
              <p className="text-xs text-info-700">Processing, Audit Logs, Note</p>
            </div>
          </div>
        </section>

        {/* 2. Bilingual Typography Tokens */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">2. Typography Tokens & Bilingual Hierarchy</h2>
            <p className="text-sm text-neutral-500">
              Inter for enterprise data density & Hind Siliguri for authentic Bangla typography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>English Typography (Inter / Manrope)</CardTitle>
                <CardDescription>Default retail operating system typography scale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5">Display</span>
                  <span className="text-3xl font-black text-neutral-900">Commercial Retail OS</span>
                </div>
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5">Heading 2</span>
                  <span className="text-2xl font-bold text-neutral-900">Multi-Branch Inventory & POS</span>
                </div>
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5">Body Large</span>
                  <span className="text-base text-neutral-700">Enterprise supermarket operations with automated restocking.</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5">Caption & Metadata</span>
                  <span className="text-xs text-neutral-500 font-medium">Audit reference ID: ECO-BR-01-TX9402 • Synced Asia/Dhaka</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bangla Typography (Hind Siliguri)</CardTitle>
                <CardDescription>Native localized script for retail staff & shoppers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 font-bangla">
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5 font-sans">ডিসপ্লে</span>
                  <span className="text-3xl font-black text-forest-900">ইকোবাজার সুপার শপ</span>
                </div>
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5 font-sans">শিরোনাম ২</span>
                  <span className="text-2xl font-bold text-neutral-900">তাজা শাকসবজি ও দৈনিক মুদি সামগ্রী</span>
                </div>
                <div className="border-b border-neutral-100 pb-2">
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5 font-sans">মূল বিবরণী</span>
                  <span className="text-base text-neutral-700">ধানমন্ডি, গুলশান ও উত্তরা শাখা থেকে দ্রুততম ডেলিভারি ও মান নিয়ন্ত্রণ।</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-0.5 font-sans">ক্যাপশন ও লেবেল</span>
                  <span className="text-xs text-neutral-500 font-medium">সর্বমোট মূল্য: ৳ ১,৮৫০ (ভ্যাট অন্তর্ভুক্ত) • স্টক সীমিত</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. Buttons & Actions */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">3. Buttons & Interactive States</h2>
            <p className="text-sm text-neutral-500">
              Variants, sizes, loading spinners, and icon adornments.
            </p>
          </div>

          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Button Variants</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default">Primary Default</Button>
                  <Button variant="forest">Forest Green</Button>
                  <Button variant="secondary">Mint Secondary</Button>
                  <Button variant="orange">Accent Orange</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="link">Link Style</Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Button Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small (sm)</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large (lg)</Button>
                  <Button size="icon" aria-label="Add item">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Loading & Icon States</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button leftIcon={<ShoppingBag className="h-4 w-4" />}>Add to Cart</Button>
                  <Button variant="forest" rightIcon={<ChevronRight className="h-4 w-4" />}>
                    Checkout POS
                  </Button>
                  <Button isLoading variant="default">
                    Saving Order...
                  </Button>
                  <Button disabled variant="outline">
                    Disabled Action
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Badges & Status Indicators */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">4. Badges & Status Indicators</h2>
            <p className="text-sm text-neutral-500">
              Clear visual tags for stock, order status, roles, and branch designations.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="forest">Branch Active</Badge>
                <Badge variant="mint" dot>
                  Online
                </Badge>
                <Badge variant="success" dot>
                  In Stock
                </Badge>
                <Badge variant="warning" dot>
                  Low Stock
                </Badge>
                <Badge variant="danger" dot>
                  Out of Stock
                </Badge>
                <Badge variant="info">Audit Verified</Badge>
                <Badge variant="orange">Flash Sale 20%</Badge>
                <Badge variant="outline">Standard SKU</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge size="sm" variant="success">
                  Small Tag
                </Badge>
                <Badge size="default" variant="success">
                  Default Badge
                </Badge>
                <Badge size="lg" variant="success">
                  Large Designation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. Form Controls & Inputs */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">5. Form Controls & Data Inputs</h2>
            <p className="text-sm text-neutral-500">
              Accessible inputs, textareas, selects, checkboxes, radios, and switches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs & Selects</CardTitle>
                <CardDescription>Structured field capture with validation & icons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Search Inventory"
                  placeholder="Scan barcode or type SKU / item name..."
                  leftIcon={<Search className="h-4 w-4" />}
                />
                <Input
                  label="Restock Threshold"
                  placeholder="e.g. 25"
                  helperText="Automated alert triggers when stock dips below this limit."
                />
                <Input
                  label="Tax ID (NID / BIN)"
                  placeholder="Enter 13-digit BIN"
                  error="Valid Bangladesh BIN is required for commercial invoices."
                />
                <Select
                  label="Select Operating Branch"
                  options={[
                    { value: 'dhanmondi', label: 'Dhanmondi Branch (Flagship)' },
                    { value: 'gulshan', label: 'Gulshan-2 Superstore' },
                    { value: 'uttara', label: 'Uttara Sector 11 Express' },
                  ]}
                />
                <Textarea
                  label="Warehouse Transfer Notes"
                  placeholder="Provide vehicle details and delivery dispatch time..."
                  showCharCount
                  maxLength={150}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Toggles, Checkboxes & Radios</CardTitle>
                <CardDescription>Accessible selection controls with keyboard support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Switches
                  </h4>
                  <Switch
                    label="Automated Nightly Expiry Check"
                    description="Run background cron to flag products expiring within 7 days."
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e.target.checked)}
                  />
                  <Switch
                    label="POS Thermal Receipt Auto-Print"
                    description="Generate physical customer slip upon transaction confirmation."
                    defaultChecked={false}
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Checkboxes
                  </h4>
                  <Checkbox
                    label="Notify Branch Manager via SMS"
                    description="Bangladesh local SMS gateway integration"
                    checked={checkboxChecked}
                    onChange={(e) => setCheckboxChecked(e.target.checked)}
                  />
                  <Checkbox
                    label="Mark as Perishable Batch"
                    description="Enforces strict FEFO (First Expired, First Out)"
                    defaultChecked
                  />
                  <Checkbox label="Require dual-key manager approval for refunds" />
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Radio Selection
                  </h4>
                  <RadioGroup
                    value={radioValue}
                    onChange={(e) => setRadioValue(e.target.value)}
                    label="Default Fulfillment Hub"
                  >
                    <Radio
                      value="dhanmondi"
                      label="Dhanmondi Central Hub"
                      description="Fastest delivery for South & Central Dhaka"
                    />
                    <Radio
                      value="gulshan"
                      label="Gulshan Hub"
                      description="Specialized cold-chain storage facility"
                    />
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. Avatars & Dropdowns */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">6. Avatars, Tooltips & Dropdowns</h2>
            <p className="text-sm text-neutral-500">
              Identity indicators and popover navigation elements.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Avatar Sizes & Presence
                  </h4>
                  <div className="flex items-center gap-3">
                    <Avatar size="xs" name="Raihan Rana" status="online" />
                    <Avatar size="sm" name="Tanvir Ahmed" status="away" />
                    <Avatar size="default" name="Owner Admin" status="busy" />
                    <Avatar size="lg" name="Karim Ullah" status="offline" />
                    <Avatar size="xl" name="ECOBAZAR Manager" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Interactive Tooltip
                  </h4>
                  <div className="flex items-center gap-3">
                    <Tooltip content="Stock audited 12 minutes ago">
                      <Button variant="outline" size="sm">
                        Hover for Tooltip
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Accessible Dropdown Menu
                  </h4>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                        Manage Branch
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent align="left">
                      <DropdownLabel>Branch Controls</DropdownLabel>
                      <DropdownItem icon={<Edit className="h-4 w-4" />}>Edit Settings</DropdownItem>
                      <DropdownItem icon={<RefreshCw className="h-4 w-4" />}>Sync Stock</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem variant="danger" icon={<Trash2 className="h-4 w-4" />}>
                        Deactivate Branch
                      </DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 7. Tabs, Data Table & Pagination */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">7. Data Presentation & Tables</h2>
            <p className="text-sm text-neutral-500">
              Enterprise sorting, responsive rows, dense view, and accessible pagination.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Branch Inventory Registry</CardTitle>
                  <CardDescription>Live SKU status with interactive sorting</CardDescription>
                </div>
                <Tabs value={activeTab} onValueChange={setActiveTab} variant="pills">
                  <TabsList>
                    <TabsTrigger value="overview">All Items (5)</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock (1)</TabsTrigger>
                    <TabsTrigger value="out-of-stock">Out (1)</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <DataTable
                data={sortedProducts}
                keyExtractor={(item) => item.id}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSort={handleSort}
                zebra
                columns={[
                  {
                    key: 'name',
                    header: 'Product Name',
                    sortable: true,
                    cell: (item) => (
                      <div>
                        <span className="font-semibold text-neutral-900">{item.name}</span>
                        <span className="text-xs text-neutral-400 block">SKU: ECO-00{item.id}</span>
                      </div>
                    ),
                  },
                  {
                    key: 'category',
                    header: 'Category',
                    sortable: true,
                    cell: (item) => <span className="text-neutral-600">{item.category}</span>,
                  },
                  {
                    key: 'price',
                    header: 'Unit Price',
                    sortable: true,
                    align: 'right',
                    cell: (item) => (
                      <PriceDisplay amount={item.price} size="sm" className="font-bold text-forest-900" />
                    ),
                  },
                  {
                    key: 'stock',
                    header: 'Current Stock',
                    sortable: true,
                    align: 'center',
                    cell: (item) => <span className="font-mono font-medium">{item.stock} pcs</span>,
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    align: 'center',
                    cell: (item) => {
                      const variant =
                        item.status === 'In Stock'
                          ? 'success'
                          : item.status === 'Low Stock'
                          ? 'warning'
                          : 'danger';
                      return (
                        <Badge variant={variant} dot size="sm">
                          {item.status}
                        </Badge>
                      );
                    },
                  },
                  {
                    key: 'actions',
                    header: 'Action',
                    align: 'right',
                    cell: () => (
                      <Button variant="ghost" size="sm">
                        Inspect
                      </Button>
                    ),
                  },
                ]}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={8}
                totalItems={40}
                itemsPerPage={5}
                showItemCount
                onPageChange={(p) => setCurrentPage(p)}
              />
            </CardContent>
          </Card>
        </section>

        {/* 8. Modals, Drawers, Toasts & Feedback */}
        <section className="space-y-4">
          <div className="border-b border-neutral-200 pb-2">
            <h2 className="text-2xl font-bold text-neutral-900">8. Overlays, Feedback & Empty States</h2>
            <p className="text-sm text-neutral-500">
              Dialogs, slide-over sheets, toast dispatches, and loading skeletons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overlay Triggers</CardTitle>
                <CardDescription>Test interactive modals and slide-out sheets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                    Open Dialog Modal
                  </Button>
                  <Button variant="forest" onClick={() => setIsDrawerOpen(true)}>
                    Open Slide Drawer
                  </Button>
                  <Button variant="danger" onClick={() => setIsConfirmOpen(true)}>
                    Trigger Danger Confirmation
                  </Button>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                    Toast Notification Triggers
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success('Order Placed Successfully', 'Invoice #INV-2026-091 created.')}
                    >
                      Success Toast
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.warning('Stock Level Alert', 'Miniket Rice is below 15 units.')}
                    >
                      Warning Toast
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.error('Payment Gateway Error', 'bKash gateway session timed out.')}
                    >
                      Error Toast
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info('System Sync Complete', 'All 3 branches refreshed.')}
                    >
                      Info Toast
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton & Empty States</CardTitle>
                <CardDescription>Zero-state and async loading placeholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="rectangular" height={36} />
                </div>
                <div className="pt-2">
                  <EmptyState
                    compact
                    title="No Purchase Orders Pending"
                    description="All supplier deliveries for today have been inspected and logged into inventory."
                    action={<Button size="sm">Create New PO</Button>}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Interactive Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>Add New Product SKU</DialogTitle>
          <DialogDescription>
            Enter initial product batch metadata to register in Dhanmondi branch inventory.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-4">
          <Input label="Product Name" placeholder="e.g. Organic Brown Rice 5kg" />
          <Input label="Initial Cost Price (BDT)" placeholder="৳ 450" />
          <Input label="Selling Retail Price (BDT)" placeholder="৳ 520" />
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={() => {
              setIsDialogOpen(false);
              toast.success('Product Added', 'Organic Brown Rice 5kg added to catalog.');
            }}
          >
            Save SKU
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Interactive Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} size="md">
        <DrawerHeader>
          <DrawerTitle>Branch Operational Parameters</DrawerTitle>
          <DrawerDescription>Configure local threshold rules and POS terminal locks.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-4">
          <Input label="Terminal Count" defaultValue="4" />
          <Select
            label="Cash In Drawer Threshold"
            options={[
              { value: '50000', label: '৳ 50,000' },
              { value: '100000', label: '৳ 100,000' },
              { value: '200000', label: '৳ 200,000' },
            ]}
          />
          <Switch
            label="Mandatory Customer Mobile for POS Invoicing"
            description="Collect phone number for automated SMS bill and loyalty points."
            defaultChecked
          />
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
            Close
          </Button>
          <Button
            variant="forest"
            onClick={() => {
              setIsDrawerOpen(false);
              toast.success('Parameters Updated', 'Branch settings synced across terminals.');
            }}
          >
            Apply Changes
          </Button>
        </DrawerFooter>
      </Drawer>

      {/* Interactive Confirmation Dialog */}
      <ConfirmationDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        title="Revoke Cashier Session?"
        description="This will immediately invalidate the cashier's active POS terminal session and trigger cash drawer balance tally."
        confirmText="Revoke Session"
        cancelText="Keep Active"
        intent="danger"
        onConfirm={() => {
          setIsConfirmOpen(false);
          toast.warning('Session Revoked', 'Terminal lock sequence initiated.');
        }}
      />
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <ToastProvider>
      <ShowcaseContent />
    </ToastProvider>
  );
}
