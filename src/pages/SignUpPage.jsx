"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function SignUpPage() {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState("jobseeker")
  const [formData, setFormData] = useState({
    // Jobseeker fields
    firstName: "",
    lastName: "",
    
    // Account Credentials
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Company Information
    companyName: "",
    industry: "",
    description: "",
    size: "",
    establishmentYear: "",
    address: "",
    
    // Representative Details
    fullName: "",
    position: "",
    contactPhone: "",
    
    // Online Presence
    website: "",
    linkedin: "",
    
    // Agreement
    terms: false
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)

  // Industry options
  const industries = [
    "Technology & Software",
    "Healthcare & Medical",
    "Finance & Banking",
    "Education & Training",
    "Manufacturing",
    "Retail & E-commerce",
    "Marketing & Advertising",
    "Consulting & Professional Services",
    "Real Estate",
    "Hospitality & Tourism",
    "Transportation & Logistics",
    "Energy & Utilities",
    "Media & Entertainment",
    "Non-profit & NGO",
    "Government & Public Sector",
    "Other"
  ]

  // Company size options
  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees"
  ]

  // Password strength checker
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password)
    setPasswordStrength(strength)
  }, [formData.password])

  const calculatePasswordStrength = (password) => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score
  }

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return { text: "Weak", color: "text-red-500", bgColor: "bg-red-100" }
    if (strength <= 3) return { text: "Fair", color: "text-yellow-500", bgColor: "bg-yellow-100" }
    if (strength <= 4) return { text: "Good", color: "text-blue-500", bgColor: "bg-blue-100" }
    return { text: "Strong", color: "text-green-500", bgColor: "bg-green-100" }
  }

  const validateForm = () => {
    const newErrors = {}

    if (accountType === "jobseeker") {
      // Jobseeker validation
      if (!formData.firstName?.trim()) {
        newErrors.firstName = "First name is required"
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters"
      }

      if (!formData.lastName?.trim()) {
        newErrors.lastName = "Last name is required"
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters"
      }
    } else {
      // Company validation
      if (!formData.companyName?.trim()) {
        newErrors.companyName = "Company name is required"
      } else if (formData.companyName.trim().length < 2) {
        newErrors.companyName = "Company name must be at least 2 characters"
      }

      if (!formData.industry) {
        newErrors.industry = "Please select an industry"
      }

      if (!formData.description?.trim()) {
        newErrors.description = "Company description is required"
      } else if (formData.description.trim().length < 10) {
        newErrors.description = "Description must be at least 10 characters"
      }

      if (!formData.size) {
        newErrors.size = "Please select company size"
      }

      if (!formData.establishmentYear) {
        newErrors.establishmentYear = "Establishment year is required"
      } else if (!/^\d{4}$/.test(formData.establishmentYear) || 
                 parseInt(formData.establishmentYear) < 1800 || 
                 parseInt(formData.establishmentYear) > new Date().getFullYear()) {
        newErrors.establishmentYear = "Please enter a valid year between 1800 and current year"
      }

      if (!formData.fullName?.trim()) {
        newErrors.fullName = "Representative name is required"
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Representative name must be at least 2 characters"
      }

      if (!formData.position?.trim()) {
        newErrors.position = "Position is required"
      } else if (formData.position.trim().length < 2) {
        newErrors.position = "Position must be at least 2 characters"
      }

      if (!formData.contactPhone?.trim()) {
        newErrors.contactPhone = "Contact phone is required"
      } else if (!/^\d{10}$/.test(formData.contactPhone.replace(/\D/g, ""))) {
        newErrors.contactPhone = "Contact phone must be exactly 10 digits"
      }

      if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        newErrors.website = "Please enter a valid website URL"
      }

      if (formData.linkedin && !/^https?:\/\/.+/.test(formData.linkedin)) {
        newErrors.linkedin = "Please enter a valid LinkedIn URL"
      }
    }

    // Common validation for both types
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (accountType === "jobseeker") {
      const phoneRegex = /^\d{10}$/
      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Phone number must be exactly 10 digits"
      }
    } else {
      const phoneRegex = /^\d{10}$/
      if (!formData.phone?.trim()) {
        newErrors.phone = "Company phone number is required"
      } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Company phone number must be exactly 10 digits"
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain both letters and numbers"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handlePhoneChange = (value) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 10)
    handleInputChange("phone", numericValue)
  }

  const handleContactPhoneChange = (value) => {
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/\D/g, "").slice(0, 10)
    handleInputChange("contactPhone", numericValue)
  }

  const handleLogoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
        setErrors(prev => ({ ...prev, logo: "Please upload a valid image file (JPG, PNG)" }))
        return
      }
      
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: "File size must be less than 2MB" }))
        return
      }
      
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
      setErrors(prev => ({ ...prev, logo: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success - redirect to login with account type pre-filled
      navigate("/login", { 
        state: { 
          accountType: accountType,
          message: "Account created successfully! Please sign in." 
        } 
      })
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ general: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderJobSeekerForm = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">👤</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
          Register Jobseeker Account
        </h2>
        <p className="text-muted-foreground text-lg">
          Create your account and start your job search journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-semibold">
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                errors.firstName 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                  : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 flex items-center space-x-1">
                <span>⚠</span>
                <span>{errors.firstName}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-semibold">
              Last Name *
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                errors.lastName 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                  : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 flex items-center space-x-1">
                <span>⚠</span>
                <span>{errors.lastName}</span>
              </p>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`h-12 rounded-xl border-2 transition-all duration-300 ${
              errors.email 
                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold">
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="1234567890"
            value={formData.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            maxLength={10}
            className={`h-12 rounded-xl border-2 transition-all duration-300 ${
              errors.phone 
                ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">
            Password *
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`h-12 rounded-xl border-2 pr-12 transition-all duration-300 ${
                errors.password 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                  : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Password strength:</span>
              <span className={`text-xs font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                {getPasswordStrengthText(passwordStrength).text}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthText(passwordStrength).bgColor}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Must be at least 8 characters with letters and numbers
            </p>
          </div>
          
          {errors.password && (
            <p className="text-sm text-red-500 flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.password}</span>
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-semibold">
            Confirm Password *
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`h-12 rounded-xl border-2 pr-12 transition-all duration-300 ${
                errors.confirmPassword 
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                  : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 flex items-center space-x-1">
              <span>⚠</span>
              <span>{errors.confirmPassword}</span>
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={formData.terms}
              onCheckedChange={(checked) => handleInputChange("terms", checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="terms" className="text-sm font-medium leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline font-semibold">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline font-semibold">
                  Privacy Policy
                </Link>
              </Label>
              {errors.terms && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Account...</span>
            </div>
          ) : (
            "Create Jobseeker Account"
          )}
        </Button>

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}
      </form>
    </div>
  )

  const renderCompanyForm = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">🏢</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
          Register Company Account
        </h2>
        <p className="text-muted-foreground text-lg">
          Create your company profile and start posting jobs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Account Credentials Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">1</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Account Credentials</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyEmail" className="text-sm font-semibold">
                Email Address *
              </Label>
              <Input
                id="companyEmail"
                type="email"
                placeholder="company@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.email 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPassword" className="text-sm font-semibold">
                Password *
              </Label>
              <div className="relative">
                <Input
                  id="companyPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-12 rounded-xl border-2 pr-12 transition-all duration-300 ${
                    errors.password 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Password strength:</span>
                  <span className={`text-xs font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                    {getPasswordStrengthText(passwordStrength).text}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthText(passwordStrength).bgColor}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters with letters and numbers
                </p>
              </div>
              
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyConfirmPassword" className="text-sm font-semibold">
                Confirm Password *
              </Label>
              <div className="relative">
                <Input
                  id="companyConfirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`h-12 rounded-xl border-2 pr-12 transition-all duration-300 ${
                    errors.confirmPassword 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">2</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Company Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold">
                Company Name *
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Your Company Name"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.companyName 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.companyName}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-semibold">
                  Industry *
                </Label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className={`h-12 rounded-xl border-2 px-3 transition-all duration-300 bg-background ${
                    errors.industry 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.industry}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-semibold">
                  Company Size *
                </Label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChange("size", e.target.value)}
                  className={`h-12 rounded-xl border-2 px-3 transition-all duration-300 bg-background ${
                    errors.size 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                >
                  <option value="">Select Size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.size}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">
                Company Description *
              </Label>
              <textarea
                id="description"
                placeholder="Brief description of your company, mission, and values..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className={`w-full rounded-xl border-2 p-3 transition-all duration-300 resize-none bg-background ${
                  errors.description 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.description}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="establishmentYear" className="text-sm font-semibold">
                  Establishment Year *
                </Label>
                <Input
                  id="establishmentYear"
                  type="number"
                  placeholder="2020"
                  min="1800"
                  max={new Date().getFullYear()}
                  value={formData.establishmentYear}
                  onChange={(e) => handleInputChange("establishmentYear", e.target.value)}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                    errors.establishmentYear 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                {errors.establishmentYear && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.establishmentYear}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyPhone" className="text-sm font-semibold">
                  Company Phone *
                </Label>
                <Input
                  id="companyPhone"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={10}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                    errors.phone 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-semibold">
                Company Address *
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="123 Business St, City, State, ZIP"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.address 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.address && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.address}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Representative Details Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">3</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Representative Details</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                    errors.fullName 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-semibold">
                  Position *
                </Label>
                <Input
                  id="position"
                  type="text"
                  placeholder="HR Manager"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                    errors.position 
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                      : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                  }`}
                />
                {errors.position && (
                  <p className="text-sm text-red-500 flex items-center space-x-1">
                    <span>⚠</span>
                    <span>{errors.position}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-sm font-semibold">
                Contact Phone *
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="1234567890"
                value={formData.contactPhone}
                onChange={(e) => handleContactPhoneChange(e.target.value)}
                maxLength={10}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.contactPhone 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.contactPhone && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.contactPhone}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Online Presence Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">4</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Online Presence (Optional)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-semibold">
                Website
              </Label>
              <Input
                id="website"
                type="url"
                placeholder="https://www.yourcompany.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.website 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.website && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.website}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-sm font-semibold">
                LinkedIn Company Page
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://www.linkedin.com/company/yourcompany"
                value={formData.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                className={`h-12 rounded-xl border-2 transition-all duration-300 ${
                  errors.linkedin 
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                    : "border-border/50 focus:border-primary/50 focus:ring-primary/20"
                }`}
              />
              {errors.linkedin && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.linkedin}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">5</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Company Logo (Optional)</h3>
          </div>
          
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-300">
              <input
                type="file"
                id="logo"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label htmlFor="logo" className="cursor-pointer">
                {logoPreview ? (
                  <div className="space-y-4">
                    <img 
                      src={logoPreview} 
                      alt="Company logo preview" 
                      className="w-24 h-24 mx-auto rounded-xl object-cover border-2 border-border/50"
                    />
                    <p className="text-sm text-muted-foreground">Click to change logo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-24 h-24 mx-auto bg-muted/50 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">📷</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Upload company logo</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
            {errors.logo && (
              <p className="text-sm text-red-500 flex items-center space-x-1">
                <span>⚠</span>
                <span>{errors.logo}</span>
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="companyTerms"
              checked={formData.terms}
              onCheckedChange={(checked) => handleInputChange("terms", checked)}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor="companyTerms" className="text-sm font-medium leading-relaxed">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline font-semibold">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline font-semibold">
                  Privacy Policy
                </Link>
              </Label>
              {errors.terms && (
                <p className="text-sm text-red-500 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>{errors.terms}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Creating Company Account...</span>
            </div>
          ) : (
            "Create Company Account"
          )}
        </Button>

        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600 text-center">{errors.general}</p>
          </div>
        )}
      </form>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Account Type Selector */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-card rounded-2xl p-2 shadow-lg border border-border/50">
              <div className="flex space-x-1">
                <button
                  onClick={() => setAccountType("jobseeker")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    accountType === "jobseeker"
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>👤</span>
                    <span>Job Seeker</span>
                  </div>
                </button>
                <button
                  onClick={() => setAccountType("company")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    accountType === "company"
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>🏢</span>
                    <span>Company</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              {accountType === "jobseeker" ? renderJobSeekerForm() : renderCompanyForm()}
            </CardContent>
          </Card>

          {/* Back to Login */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:underline font-semibold hover:text-primary/80 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}