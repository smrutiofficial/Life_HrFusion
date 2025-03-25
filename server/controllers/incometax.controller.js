export const calculateIncomeTax = (req, res) => {
    try {
        const { basicPay, allowances } = req.body;
        const deductions = 0;
        if (basicPay === undefined || allowances === undefined || deductions === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const STANDARD_DEDUCTION = 75000;
        const SSAS_CESS_PERCENT = 4;

        // Step 1: Calculate Gross Income
        const grossIncome = basicPay + allowances;

        // Step 2: Compute Taxable Income
        let taxableIncome = grossIncome - (deductions + STANDARD_DEDUCTION);
        taxableIncome = Math.max(0, taxableIncome); // Ensure taxable income is not negative

        // Step 3: Apply New Tax Slabs Correctly
        let remainingIncome = taxableIncome;
        let taxAmount = 0;

        const slabs = [
            { limit: 300000, rate: 0.00 },
            { limit: 600000, rate: 0.05 },
            { limit: 900000, rate: 0.10 },
            { limit: 1200000, rate: 0.15 },
            { limit: 1500000, rate: 0.20 },
            { limit: Infinity, rate: 0.30 },
        ];

        let prevLimit = 0;
        for (const slab of slabs) {
            if (remainingIncome > slab.limit) {
                taxAmount += (slab.limit - prevLimit) * slab.rate;
            } else {
                taxAmount += (remainingIncome - prevLimit) * slab.rate;
                break;
            }
            prevLimit = slab.limit;
        }

        // Step 4: Apply Rebate under Section 87A (if taxable income is <= 7,00,000)
        if (taxableIncome <= 700000) {
            taxAmount = 0;
        }

        // Step 5: Apply 4% SSAS Cess
        const cess = taxAmount * (SSAS_CESS_PERCENT / 100);
        const finalTax = taxAmount + cess;

        return res.status(200).json({
            grossIncome,
            taxableIncome,
            taxAmount,
            cess,
            finalTax
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
