import { TrendingUp, Calculator } from 'lucide-react';

export const toolsConfig = [
  {
    id: 'investment',
    icon: TrendingUp,
    category: 'finance',
    color: 'bg-emerald-500',
    path: '/tools/investment'
  },
  {
    id: 'proportion',
    icon: Calculator,
    category: 'utilities',
    color: 'bg-purple-500',
    path: '/tools/proportion'
  }
];

export const categories = [
  { id: 'all', key: 'all' },
  { id: 'finance', key: 'finance' },
  { id: 'utilities', key: 'utilities' }
];