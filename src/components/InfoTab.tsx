import React from 'react';
import SifuPromotionCriteria from './SifuPromotionCriteria';

export default function InfoTab() {
  return (
    <section className="martial-card info-tab">
      <h2>Info & Advancement Criteria</h2>
      <SifuPromotionCriteria />
      <p className="plan-note">All advancement is based on real JKD sources. Review criteria here any time.</p>
    </section>
  );
}