'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart2, Check, X, Star } from 'lucide-react';
import { Button } from '@/components/ui';

const COMPARE_PRODUCTS = [
  { id: '1', name: 'KinePulse Pro', price: 299, rating: 4.9, specs: { 'Batería': '48h', 'Conectividad': 'Bluetooth 5.0', 'Resistencia al agua': 'IP68', 'Sensores': '12', 'Peso': '32g' }, features: ['GPS integrado', 'Monitor cardíaco', 'SpO2', 'ECG'], emoji: '⚡' },
  { id: '2', name: 'SensorKit Elite', price: 199, rating: 4.8, specs: { 'Batería': '72h', 'Conectividad': 'ANT+ / BT', 'Resistencia al agua': 'IP67', 'Sensores': '8', 'Peso': '18g' }, features: ['GPS integrado', 'Monitor cardíaco', 'SpO2', 'ECG'], emoji: '📡' },
  { id: '3', name: 'Training Pack Pro', price: 449, rating: 4.7, specs: { 'Batería': '36h', 'Conectividad': 'WiFi + BT 5.2', 'Resistencia al agua': 'IPX5', 'Sensores': '20', 'Peso': '85g' }, features: ['GPS integrado', 'Monitor cardíaco', 'SpO2', 'ECG'], emoji: '🎯' },
];

const ALL_SPECS = ['Batería', 'Conectividad', 'Resistencia al agua', 'Sensores', 'Peso'];
const ALL_FEATURES = ['GPS integrado', 'Monitor cardíaco', 'SpO2', 'ECG'];

export default function ComparatorPage() {
  const [selected, setSelected] = useState<string[]>(['1', '2']);

  const products = COMPARE_PRODUCTS.filter(p => selected.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Volver a productos
      </Link>
      <div className="flex items-center gap-4 mb-10">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400"><BarChart2 size={24} /></div>
        <div>
          <h1 className="text-3xl font-bold text-white">Comparador de Productos</h1>
          <p className="text-zinc-400">Selecciona hasta 3 productos para comparar sus características.</p>
        </div>
      </div>

      {/* Product Selector */}
      <div className="flex flex-wrap gap-3 mb-10">
        {COMPARE_PRODUCTS.map(p => (
          <button key={p.id} onClick={() => setSelected(prev => prev.includes(p.id) ? prev.filter(i => i !== p.id) : prev.length < 3 ? [...prev, p.id] : prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${selected.includes(p.id) ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-zinc-700 bg-kb-card text-zinc-400 hover:border-zinc-500'}`}>
            <span>{p.emoji}</span> {p.name}
            {selected.includes(p.id) && <Check size={14} className="text-emerald-400" />}
          </button>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left p-6 text-zinc-400 font-medium w-1/4">Característica</th>
              {products.map(p => (
                <th key={p.id} className="p-6 text-center">
                  <div className="text-4xl mb-3">{p.emoji}</div>
                  <p className="font-bold text-white">{p.name}</p>
                  <p className="text-2xl font-extrabold text-emerald-400 mt-2">${p.price}</p>
                  <div className="flex justify-center items-center gap-1 mt-2">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm text-zinc-300">{p.rating}</span>
                  </div>
                  <Link href={`/products/${p.name.toLowerCase().replace(/\s+/g, '-')}`} className="mt-4 inline-block w-full">
                    <Button size="sm" fullWidth>Ver Producto</Button>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_SPECS.map((spec, i) => (
              <tr key={spec} className={`border-b border-zinc-800 ${i % 2 === 0 ? 'bg-zinc-900/30' : ''}`}>
                <td className="p-5 text-sm font-medium text-zinc-400">{spec}</td>
                {products.map(p => (
                  <td key={p.id} className="p-5 text-center text-sm text-white font-medium">{(p.specs as any)[spec] || '—'}</td>
                ))}
              </tr>
            ))}
            {ALL_FEATURES.map((feat, i) => (
              <tr key={feat} className={`border-b border-zinc-800 ${(ALL_SPECS.length + i) % 2 === 0 ? 'bg-zinc-900/30' : ''}`}>
                <td className="p-5 text-sm font-medium text-zinc-400">{feat}</td>
                {products.map(p => (
                  <td key={p.id} className="p-5 text-center">
                    {p.features.includes(feat) ? <Check size={18} className="text-emerald-400 mx-auto" /> : <X size={18} className="text-zinc-600 mx-auto" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
