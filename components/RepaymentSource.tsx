"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface RepaymentSourceFormProps {
  onNext: (data: any) => void
  onBack: () => void
  formData: any
}

export function RepaymentSourceForm({ onNext, onBack, formData }: RepaymentSourceFormProps) {
  const [data, setData] = useState(formData.repaymentSource || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ repaymentSource: data })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Primary Income Source */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Primary Income Source</h2>

        <div className="space-y-4">
          <Label>Primary Source of Repayment*</Label>
          <RadioGroup
            value={data.primarySource}
            onValueChange={(value) => setData({ ...data, primarySource: value })}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="salary" id="salary" />
              <Label htmlFor="salary" className="font-normal cursor-pointer">
                Salary Income
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business" className="font-normal cursor-pointer">
                Business Income
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rental" id="rental" />
              <Label htmlFor="rental" className="font-normal cursor-pointer">
                Rental Income
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="investment" id="investment" />
              <Label htmlFor="investment" className="font-normal cursor-pointer">
                Investment Income
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="font-normal cursor-pointer">
                Other
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthly-income">
              Monthly Income (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="monthly-income"
              type="number"
              placeholder="Enter Monthly Income"
              value={data.monthlyIncome || ""}
              onChange={(e) => setData({ ...data, monthlyIncome: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="annual-income">
              Annual Income (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="annual-income"
              type="number"
              placeholder="Enter Annual Income"
              value={data.annualIncome || ""}
              onChange={(e) => setData({ ...data, annualIncome: e.target.value })}
              required
            />
          </div>
        </div>

        {data.primarySource === "other" && (
          <div className="space-y-2">
            <Label htmlFor="other-source-details">
              Specify Other Source <span className="text-destructive">*</span>
            </Label>
            <Input
              id="other-source-details"
              placeholder="Specify your income source"
              value={data.otherSourceDetails || ""}
              onChange={(e) => setData({ ...data, otherSourceDetails: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Additional Income Sources */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Additional Income Sources</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="additional-source-1">Additional Source 1</Label>
            <Select
              value={data.additionalSource1}
              onValueChange={(value) => setData({ ...data, additionalSource1: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary Income</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="rental">Rental Income</SelectItem>
                <SelectItem value="investment">Investment Income</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="freelance">Freelance Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-amount-1">Monthly Amount (Nu.)</Label>
            <Input
              id="additional-amount-1"
              type="number"
              placeholder="Enter Amount"
              value={data.additionalAmount1 || ""}
              onChange={(e) => setData({ ...data, additionalAmount1: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-proof-1">Proof Document</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="additional-source-2">Additional Source 2</Label>
            <Select
              value={data.additionalSource2}
              onValueChange={(value) => setData({ ...data, additionalSource2: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salary">Salary Income</SelectItem>
                <SelectItem value="business">Business Income</SelectItem>
                <SelectItem value="rental">Rental Income</SelectItem>
                <SelectItem value="investment">Investment Income</SelectItem>
                <SelectItem value="pension">Pension</SelectItem>
                <SelectItem value="freelance">Freelance Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-amount-2">Monthly Amount (Nu.)</Label>
            <Input
              id="additional-amount-2"
              type="number"
              placeholder="Enter Amount"
              value={data.additionalAmount2 || ""}
              onChange={(e) => setData({ ...data, additionalAmount2: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-proof-2">Proof Document</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Expenses */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Monthly Expenses</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="household-expense">
              Household Expenses (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="household-expense"
              type="number"
              placeholder="Enter Amount"
              value={data.householdExpense || ""}
              onChange={(e) => setData({ ...data, householdExpense: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education-expense">Education Expenses (Nu.)</Label>
            <Input
              id="education-expense"
              type="number"
              placeholder="Enter Amount"
              value={data.educationExpense || ""}
              onChange={(e) => setData({ ...data, educationExpense: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medical-expense">Medical Expenses (Nu.)</Label>
            <Input
              id="medical-expense"
              type="number"
              placeholder="Enter Amount"
              value={data.medicalExpense || ""}
              onChange={(e) => setData({ ...data, medicalExpense: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="transport-expense">Transportation Expenses (Nu.)</Label>
            <Input
              id="transport-expense"
              type="number"
              placeholder="Enter Amount"
              value={data.transportExpense || ""}
              onChange={(e) => setData({ ...data, transportExpense: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loan-repayment">Existing Loan Repayments (Nu.)</Label>
            <Input
              id="loan-repayment"
              type="number"
              placeholder="Enter Amount"
              value={data.existingLoanRepayment || ""}
              onChange={(e) => setData({ ...data, existingLoanRepayment: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="other-expense">Other Expenses (Nu.)</Label>
            <Input
              id="other-expense"
              type="number"
              placeholder="Enter Amount"
              value={data.otherExpense || ""}
              onChange={(e) => setData({ ...data, otherExpense: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Monthly Expenses:</p>
              <p className="text-lg font-bold text-gray-900">
                Nu.{" "}
                {(
                  Number(data.householdExpense || 0) +
                  Number(data.educationExpense || 0) +
                  Number(data.medicalExpense || 0) +
                  Number(data.transportExpense || 0) +
                  Number(data.existingLoanRepayment || 0) +
                  Number(data.otherExpense || 0)
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Monthly Income:</p>
              <p className="text-lg font-bold text-[#FF9800]">
                Nu.{" "}
                {(
                  Number(data.monthlyIncome || 0) +
                  Number(data.additionalAmount1 || 0) +
                  Number(data.additionalAmount2 || 0) -
                  (Number(data.householdExpense || 0) +
                    Number(data.educationExpense || 0) +
                    Number(data.medicalExpense || 0) +
                    Number(data.transportExpense || 0) +
                    Number(data.existingLoanRepayment || 0) +
                    Number(data.otherExpense || 0))
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Loans/Liabilities */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Existing Loans/Liabilities</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Do you have any existing loans?*</Label>
            <RadioGroup
              value={data.hasExistingLoans}
              onValueChange={(value) => setData({ ...data, hasExistingLoans: value })}
              className="flex gap-8"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="existing-yes" />
                <Label htmlFor="existing-yes" className="font-normal cursor-pointer">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="existing-no" />
                <Label htmlFor="existing-no" className="font-normal cursor-pointer">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>

          {data.hasExistingLoans === "yes" && (
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lender-name">
                    Lender Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lender-name"
                    placeholder="Enter Lender Name"
                    value={data.lenderName || ""}
                    onChange={(e) => setData({ ...data, lenderName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-type">
                    Loan Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={data.loanType} onValueChange={(value) => setData({ ...data, loanType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="[Select]" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="housing">Housing Loan</SelectItem>
                      <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outstanding-amount">
                    Outstanding Amount (Nu.) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="outstanding-amount"
                    type="number"
                    placeholder="Enter Amount"
                    value={data.outstandingAmount || ""}
                    onChange={(e) => setData({ ...data, outstandingAmount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly-emi">
                    Monthly EMI (Nu.) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="monthly-emi"
                    type="number"
                    placeholder="Enter EMI"
                    value={data.monthlyEmi || ""}
                    onChange={(e) => setData({ ...data, monthlyEmi: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bank Account Details for Disbursement */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Bank Account Details for Disbursement</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="account-holder-name">
              Account Holder Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="account-holder-name"
              placeholder="Enter Account Holder Name"
              value={data.accountHolderName || ""}
              onChange={(e) => setData({ ...data, accountHolderName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-number">
              Account Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="account-number"
              placeholder="Enter Account Number"
              value={data.accountNumber || ""}
              onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank-name">
              Bank Name <span className="text-destructive">*</span>
            </Label>
            <Select value={data.bankName} onValueChange={(value) => setData({ ...data, bankName: value })}>
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bob">Bank of Bhutan</SelectItem>
                <SelectItem value="bnb">Bhutan National Bank</SelectItem>
                <SelectItem value="dpnb">Druk PNB Bank</SelectItem>
                <SelectItem value="tbank">T Bank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="branch-name">Branch Name</Label>
            <Input
              id="branch-name"
              placeholder="Enter Branch Name"
              value={data.branchName || ""}
              onChange={(e) => setData({ ...data, branchName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ifsc-code">IFSC/SWIFT Code</Label>
            <Input
              id="ifsc-code"
              placeholder="Enter IFSC/SWIFT Code"
              value={data.ifscCode || ""}
              onChange={(e) => setData({ ...data, ifscCode: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Supporting Documents */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Supporting Documents</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload-salary-slip">
              Upload Salary Slip/Income Proof <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-bank-statement">
              Upload Bank Statement (Last 6 Months) <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-tax-clearance">Upload Tax Clearance Certificate</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Remarks */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Additional Information</h2>

        <div className="space-y-2">
          <Label htmlFor="repayment-remarks">Remarks/Notes</Label>
          <Textarea
            id="repayment-remarks"
            placeholder="Enter any additional information regarding repayment"
            rows={4}
            value={data.remarks || ""}
            onChange={(e) => setData({ ...data, remarks: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <Button type="button" onClick={onBack} variant="secondary" size="lg" className="min-w-32">
          Back
        </Button>
        <Button type="submit" size="lg" className="min-w-32">
          Next
        </Button>
      </div>
    </form>
  )
}
