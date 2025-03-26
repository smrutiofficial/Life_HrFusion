"use client";

import React, { useCallback, useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import TaxForm from "../components/incometax/input.comp";
import TaxSummary from "../components/incometax/pie.comp";
import TaxSlabDetails from "../components/incometax/taxslab.comp";
import Preloader from "../components/preload.comp";

const Incometax = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const [taxData, setTaxData] = useState({
    basicPay: 0,
    allowances: 0,
    deductions: 0,
  });

  const handleTaxData = useCallback((data) => {
    setTaxData(data);
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Bgcomp />
          <section className="w-[100%] h-[100%] overflow-scroll">
            <div className="flex items-end">
              <Logocomp />
              <div className="flex gap-3 pb-2">
                <Link href="/">
                  <p className="text-gray-400">Dashboard</p>
                </Link>
                <p className="text-gray-400">&gt;</p>
                <p className="">IncomeTax_Calculation</p>
              </div>
            </div>
            {/* -------------------------------------------------- */}
            <div className="w-full h-fit flex">
              <div className="w-[70%] h-fit px-8">
                {/* input section */}
                <TaxForm onTaxDataChange={handleTaxData} />
              </div>
              <div className="w-[30%] h-full pr-14 pt-6">
                <TaxSummary taxData={taxData} />
              </div>
            </div>
            <div className="px-13 pb-4">
              <TaxSlabDetails />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Incometax;
