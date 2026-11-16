import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { BRAND_COLORS, SYSTEM_DEFAULTS } from '@ecobazar/constants';

export default function MobileHomeScreen() {
  const quickCategories = [
    { title: 'Fresh Veggies', bn: 'শাকসবজি' },
    { title: 'Aromatic Rice', bn: 'সুগন্ধি চাল' },
    { title: 'Dairy & Eggs', bn: 'দুধ ও ডিম' },
    { title: 'Pure Oil', bn: 'খাঁটি তেল' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Brand Header Card */}
      <View style={styles.heroCard}>
        <Text style={styles.badgeText}>🌱 Supermarket & Fresh Groceries</Text>
        <Text style={styles.heroTitle}>ECOBAZAR Express</Text>
        <Text style={styles.heroSubtitle}>
          Fast delivery across Dhaka | Standard Currency: {SYSTEM_DEFAULTS.CURRENCY_SYMBOL} (BDT)
        </Text>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>
        <View style={styles.categoryGrid}>
          {quickCategories.map((cat, idx) => (
            <TouchableOpacity key={idx} style={styles.categoryTile} activeOpacity={0.7}>
              <Text style={styles.categoryText}>{cat.title}</Text>
              <Text style={styles.categorySubText}>{cat.bn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Staff & Picker Mode Preview */}
      <View style={styles.staffCard}>
        <Text style={styles.staffTitle}>Store Staff & Picker Mode</Text>
        <Text style={styles.staffSubtitle}>
          Camera barcode scanning for in-store order picking and shelf FEFO verification.
        </Text>
        <TouchableOpacity style={styles.scanButton} activeOpacity={0.8}>
          <Text style={styles.scanButtonText}>Open Barcode Scanner</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F5',
  },
  heroCard: {
    backgroundColor: BRAND_COLORS.FOREST_GREEN,
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  badgeText: {
    color: BRAND_COLORS.MINT,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#D8F3DC',
    fontSize: 13,
    marginTop: 6,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryTile: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    width: '48%',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: BRAND_COLORS.FOREST_GREEN,
  },
  categorySubText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  staffCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  staffTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  staffSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    lineHeight: 18,
  },
  scanButton: {
    backgroundColor: BRAND_COLORS.PRIMARY_GREEN,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 14,
  },
  scanButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
