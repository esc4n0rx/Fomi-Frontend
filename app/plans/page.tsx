"use client";

import { PlanSelection } from "@/components/plan-selection";
import { useEffect } from "react";

export default function PlansPage() {
  useEffect(() => {
    localStorage.setItem('visited_plans', 'true');
  }, []);

  return <PlanSelection />;
}