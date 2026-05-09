export type PricingPlan = {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

// TODO: replace with your actual pricing plans
export const plans: PricingPlan[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For personal projects and exploration.',
    features: ['1 project', 'Up to 5 pages', 'Basic analytics', 'Community support'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    description: 'For growing teams and businesses.',
    features: [
      'Unlimited projects',
      'Up to 50 pages',
      'Advanced analytics',
      'Priority support',
      'Custom domain',
      'Remove branding',
    ],
    cta: 'Start free trial',
    recommended: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 99,
    annualPrice: 79,
    description: 'For large organizations with custom needs.',
    features: [
      'Everything in Pro',
      'Unlimited pages',
      'SSO / SAML',
      'SLA guarantee',
      'Dedicated account manager',
      'Custom integrations',
      'Invoice billing',
      'Security audit logs',
    ],
    cta: 'Contact sales',
  },
];
