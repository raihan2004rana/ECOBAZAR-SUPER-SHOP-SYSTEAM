'use client';

import * as React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building2,
  CheckCircle2,
} from 'lucide-react';
import { SiteHeader } from '../../components/site-header';
import { SiteFooter } from '../../components/site-footer';
import { CartDrawer } from '../../components/cart-drawer';
import { WishlistDrawer } from '../../components/wishlist-drawer';
import { Modals } from '../../components/modals';
import { storeBranches } from '../../data/catalog';
import { useToast } from '@ecobazar/ui';

export default function ContactPage() {
  const { toast } = useToast();

  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedBranch, setSelectedBranch] = React.useState(storeBranches[0].id);
  const [subject, setSubject] = React.useState('Order Inquiry');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      toast.error('Missing Fields', 'Please complete your name, phone, and message.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success(
        'Message Received!',
        'Our customer support manager will contact you within 15 minutes.'
      );
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F5]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-[#071F15] text-white py-14 sm:py-16 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/banner-farm-to-table.jpg"
              alt="ECOBAZAR Support"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/95 via-[#0A261B]/85 sm:via-[#0A261B]/70 to-[#0A261B]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F15] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#2EBD70] text-[#071F15] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md">
                <HelpCircle className="w-4 h-4 text-[#071F15]" />
                <span>24/7 DEDICATED CUSTOMER HELPDESK</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white drop-shadow-md">
                Contact ECOBAZAR Support
              </h1>
              <p className="text-sm sm:text-base text-emerald-50/90 mt-2 font-medium leading-relaxed drop-shadow-sm">
                Have a question about your order, delivery time, product quality, or store branches? Our team is always here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-7 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-white rounded-2xl border border-[#E5ECE7] p-5 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#64736B] uppercase font-bold">Toll-Free Helpline</p>
                <a
                  href="tel:+8809612000000"
                  className="text-base font-black text-[#123C2D] hover:text-[#21A366] transition-colors"
                >
                  +880 9612-000000
                </a>
                <p className="text-[#64736B]">7:00 AM – 11:30 PM (Daily)</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5ECE7] p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#64736B] uppercase font-bold">Email Support</p>
                <a
                  href="mailto:support@ecobazar.com.bd"
                  className="text-base font-black text-[#123C2D] hover:text-[#21A366] transition-colors"
                >
                  support@ecobazar.com.bd
                </a>
                <p className="text-[#64736B]">Replies within 30 minutes</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5ECE7] p-5 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D8F3DC] text-[#21A366] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#64736B] uppercase font-bold">Headquarters</p>
                <p className="text-sm font-black text-[#123C2D]">Dhanmondi Road 27</p>
                <p className="text-[#64736B]">Dhaka-1209, Bangladesh</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Branches Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E5ECE7] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-black text-[#17251F] mb-1">
                Send Us a Direct Message
              </h2>
              <p className="text-xs text-[#64736B] mb-6">
                Fill in your details below and our customer experience desk will reach out promptly.
              </p>

              {submitted ? (
                <div className="bg-[#D8F3DC]/40 border border-[#21A366] rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#21A366] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-[#123C2D]">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-xs text-[#64736B] max-w-sm mx-auto">
                    Your inquiry regarding &quot;{subject}&quot; has been routed to our team. A support representative will phone or message you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-bold text-[#21A366] hover:underline pt-2 inline-block"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#17251F] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Raihan Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#17251F] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1712-345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#17251F] block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#17251F] block mb-1">
                        Nearest Store Branch
                      </label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] bg-white font-medium"
                      >
                        {storeBranches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      Subject / Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366] bg-white font-medium"
                    >
                      <option value="Order Inquiry">Order Inquiry & Status</option>
                      <option value="Product Quality Feedback">Product Quality / Return Request</option>
                      <option value="Delivery Schedule">Delivery Schedule & Slot</option>
                      <option value="Corporate / Bulk Order">Corporate / Bulk Grocery Procurement</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#17251F] block mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your query or feedback in detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5ECE7] focus:outline-none focus:border-[#21A366]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#21A366] hover:bg-[#123C2D] text-white py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Branch Directory */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="font-extrabold text-base text-[#17251F]">
                Branch Hub Contact Details
              </h3>

              {storeBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="bg-white rounded-2xl border border-[#E5ECE7] p-5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#17251F] text-sm">{branch.name}</h4>
                    <span className="text-[10px] font-bold text-[#21A366] bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                      {branch.deliveryTime}
                    </span>
                  </div>
                  <p className="text-[#64736B]">{branch.address}</p>
                  <p className="text-[#17251F] font-semibold">Manager: {branch.manager}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E5ECE7]/60">
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-[#21A366] font-bold hover:underline"
                    >
                      {branch.phone}
                    </a>
                    <span className="text-gray-400">{branch.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CartDrawer />
      <WishlistDrawer />
      <Modals />
      <SiteFooter />
    </div>
  );
}
