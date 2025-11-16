"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SecurityDetailsFormProps {
  onNext: (data: any) => void
  onBack: () => void
  formData: any
}

export function SecurityDetailsForm({ onNext, onBack, formData }: SecurityDetailsFormProps) {
  const [data, setData] = useState(formData.securityDetails || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ securityDetails: data })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Primary Security/Collateral Details */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold text-[#003DA5] border-b pb-3">Primary Security/Collateral Details</h2>

        {/* Security Type - Full Width */}
        <div className="space-y-2">
          <Label htmlFor="security-type">
            Type of Security <span className="text-destructive">*</span>
          </Label>
          <Select value={data.securityType} onValueChange={(value) => setData({ ...data, securityType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select Security Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="building">Building</SelectItem>
              <SelectItem value="vehicle">Vehicle</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
              <SelectItem value="fd">Fixed Deposit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ownership Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="ownership-type">
              Ownership Type <span className="text-destructive">*</span>
            </Label>
            <Select value={data.ownershipType} onValueChange={(value) => setData({ ...data, ownershipType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Ownership Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self Owned</SelectItem>
                <SelectItem value="third-party">Third Party</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner-name">
              Owner Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="owner-name"
              placeholder="Enter Owner Name"
              value={data.ownerName || ""}
              onChange={(e) => setData({ ...data, ownerName: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Valuation Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="security-value">
              Market Value (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="security-value"
              type="number"
              placeholder="Enter Market Value"
              value={data.marketValue || ""}
              onChange={(e) => setData({ ...data, marketValue: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forced-sale-value">
              Forced Sale Value (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="forced-sale-value"
              type="number"
              placeholder="Enter Forced Sale Value"
              value={data.forcedSaleValue || ""}
              onChange={(e) => setData({ ...data, forcedSaleValue: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Vehicle Details (if applicable) */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Vehicle Details (If Applicable)</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle-type">Vehicle Type</Label>
            <Select value={data.vehicleType} onValueChange={(value) => setData({ ...data, vehicleType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-make">Make/Brand</Label>
            <Input
              id="vehicle-make"
              placeholder="Enter Make/Brand"
              value={data.vehicleMake || ""}
              onChange={(e) => setData({ ...data, vehicleMake: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-model">Model</Label>
            <Input
              id="vehicle-model"
              placeholder="Enter Model"
              value={data.vehicleModel || ""}
              onChange={(e) => setData({ ...data, vehicleModel: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-year">Year of Manufacture</Label>
            <Input
              id="vehicle-year"
              type="number"
              placeholder="Enter Year"
              value={data.vehicleYear || ""}
              onChange={(e) => setData({ ...data, vehicleYear: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="registration-no">Registration No.</Label>
            <Input
              id="registration-no"
              placeholder="Enter Registration No"
              value={data.registrationNo || ""}
              onChange={(e) => setData({ ...data, registrationNo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chassis-no">Chassis No.</Label>
            <Input
              id="chassis-no"
              placeholder="Enter Chassis No"
              value={data.chassisNo || ""}
              onChange={(e) => setData({ ...data, chassisNo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="engine-no">Engine No.</Label>
            <Input
              id="engine-no"
              placeholder="Enter Engine No"
              value={data.engineNo || ""}
              onChange={(e) => setData({ ...data, engineNo: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Property/Land Details */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Property/Land Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="thram-no">
              Thram No. <span className="text-destructive">*</span>
            </Label>
            <Input
              id="thram-no"
              placeholder="Enter Thram No"
              value={data.thramNo || ""}
              onChange={(e) => setData({ ...data, thramNo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plot-no">
              Plot No. <span className="text-destructive">*</span>
            </Label>
            <Input
              id="plot-no"
              placeholder="Enter Plot No"
              value={data.plotNo || ""}
              onChange={(e) => setData({ ...data, plotNo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">
              Area (in Sq. Ft) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="area"
              type="number"
              placeholder="Enter Area"
              value={data.area || ""}
              onChange={(e) => setData({ ...data, area: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="land-use">
              Land Use Type <span className="text-destructive">*</span>
            </Label>
            <Select value={data.landUse} onValueChange={(value) => setData({ ...data, landUse: value })}>
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="agricultural">Agricultural</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="security-dzongkhag">
              Dzongkhag <span className="text-destructive">*</span>
            </Label>
            <Select value={data.dzongkhag} onValueChange={(value) => setData({ ...data, dzongkhag: value })}>
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thimphu">Thimphu</SelectItem>
                <SelectItem value="paro">Paro</SelectItem>
                <SelectItem value="punakha">Punakha</SelectItem>
                <SelectItem value="wangdue">Wangdue Phodrang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-gewog">
              Gewog <span className="text-destructive">*</span>
            </Label>
            <Select value={data.gewog} onValueChange={(value) => setData({ ...data, gewog: value })}>
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gewog1">Gewog 1</SelectItem>
                <SelectItem value="gewog2">Gewog 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="security-village">
              Village/Street <span className="text-destructive">*</span>
            </Label>
            <Input
              id="security-village"
              placeholder="Enter Village/Street"
              value={data.village || ""}
              onChange={(e) => setData({ ...data, village: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="house-no">House No.</Label>
            <Input
              id="house-no"
              placeholder="Enter House No"
              value={data.houseNo || ""}
              onChange={(e) => setData({ ...data, houseNo: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Insurance Details */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Insurance Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="insurance-company">
              Insurance Company <span className="text-destructive">*</span>
            </Label>
            <Select
              value={data.insuranceCompany}
              onValueChange={(value) => setData({ ...data, insuranceCompany: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="[Select]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bil">Bhutan Insurance Limited</SelectItem>
                <SelectItem value="rigc">Royal Insurance Corporation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="policy-no">
              Policy No. <span className="text-destructive">*</span>
            </Label>
            <Input
              id="policy-no"
              placeholder="Enter Policy No"
              value={data.policyNo || ""}
              onChange={(e) => setData({ ...data, policyNo: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance-value">
              Insurance Value (Nu.) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="insurance-value"
              type="number"
              placeholder="Enter Insurance Value"
              value={data.insuranceValue || ""}
              onChange={(e) => setData({ ...data, insuranceValue: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="insurance-start">
              Insurance Start Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="insurance-start"
              type="date"
              value={data.insuranceStartDate || ""}
              onChange={(e) => setData({ ...data, insuranceStartDate: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance-expiry">
              Insurance Expiry Date <span className="text-destructive">*</span>
            </Label>
            <Input
              id="insurance-expiry"
              type="date"
              value={data.insuranceExpiryDate || ""}
              onChange={(e) => setData({ ...data, insuranceExpiryDate: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Supporting Documents</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upload-thram">
              Upload Thram Copy <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-valuation">Upload Valuation Report</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="upload-insurance">
              Upload Insurance Policy <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="w-28 bg-transparent">
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">No file chosen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold">Additional Information</h2>

        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks/Notes</Label>
          <Textarea
            id="remarks"
            placeholder="Enter any additional information or remarks"
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
