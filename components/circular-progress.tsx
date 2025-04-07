"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CircularProgressProps {
  currentValue: number
  totalValue: number
  size?: number
  strokeWidth?: number
  completedColor?: string
  remainingColor?: string
  label?: string
  additionalInfo?: {
    label: string
    current: number
    total: number
  }[]
  className?: string
  animationDuration?: number
}

export default function CircularProgress({
  currentValue,
  totalValue,
  size = 200,
  strokeWidth = 20,
  completedColor = "#008800",
  remainingColor = "#aa0000",
  label = "Complete",
  additionalInfo = [],
  className = "",
  animationDuration = 1.5,
}: CircularProgressProps) {
  const [percentage, setPercentage] = useState(0)

  // Calculate percentage
  useEffect(() => {
    const calculatedPercentage = Math.min(100, Math.max(0, (currentValue / totalValue) * 100))
    setPercentage(calculatedPercentage)
  }, [currentValue, totalValue])

  // Calculate circle properties based on the current size
  const getCircleProps = (currentSize: number, currentStrokeWidth: number) => {
    const radius = (currentSize - currentStrokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (percentage / 100) * circumference

    return { radius, circumference, dashOffset }
  }

  // Get circle properties for different screen sizes
  const smProps = getCircleProps(size * 0.7, strokeWidth * 0.7)
  const mdProps = getCircleProps(size * 0.85, strokeWidth * 0.85)
  const lgProps = getCircleProps(size, strokeWidth)

  return (
    <div
      className={`flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm ${className}`}
    >
      {/* Small screens (mobile) */}
      <div className="relative block sm:hidden" style={{ width: size * 0.7, height: size * 0.7 }}>
        <svg
          width={size * 0.7}
          height={size * 0.7}
          className="rotate-[-90deg]"
          viewBox={`0 0 ${size * 0.7} ${size * 0.7}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision"
          }}
        >
          <circle
            cx={(size * 0.7) / 2}
            cy={(size * 0.7) / 2}
            r={smProps.radius}
            fill="transparent"
            stroke={remainingColor}
            strokeWidth={strokeWidth * 0.7}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.05))",
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.circle
            cx={(size * 0.7) / 2}
            cy={(size * 0.7) / 2}
            r={smProps.radius}
            fill="transparent"
            stroke={completedColor}
            strokeWidth={strokeWidth * 0.7}
            strokeLinecap="round"
            strokeDasharray={smProps.circumference}
            initial={{ strokeDashoffset: smProps.circumference }}
            animate={{ strokeDashoffset: smProps.dashOffset }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.1))",
              vectorEffect: "non-scaling-stroke",
            }}
          />
        </svg>

        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-center">
          <motion.span
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
          <span className="text-sm">{label}</span>
        </div>
      </div>

      {/* Medium screens (tablets) */}
      <div className="relative hidden sm:block md:hidden" style={{ width: size * 0.85, height: size * 0.85 }}>
        <svg
          width={size * 0.85}
          height={size * 0.85}
          className="rotate-[-90deg]"
          viewBox={`0 0 ${size * 0.85} ${size * 0.85}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision"
          }}
        >
          <circle
            cx={(size * 0.85) / 2}
            cy={(size * 0.85) / 2}
            r={mdProps.radius}
            fill="transparent"
            stroke={remainingColor}
            strokeWidth={strokeWidth * 0.85}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.05))",
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.circle
            cx={(size * 0.85) / 2}
            cy={(size * 0.85) / 2}
            r={mdProps.radius}
            fill="transparent"
            stroke={completedColor}
            strokeWidth={strokeWidth * 0.85}
            strokeLinecap="round"
            strokeDasharray={mdProps.circumference}
            initial={{ strokeDashoffset: mdProps.circumference }}
            animate={{ strokeDashoffset: mdProps.dashOffset }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.1))",
              vectorEffect: "non-scaling-stroke",
            }}
          />
        </svg>

        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-center">
          <motion.span
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
          <span className="text-base">{label}</span>
        </div>
      </div>

      {/* Large screens (desktop) */}
      <div className="relative hidden md:block" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="rotate-[-90deg]"
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision"
          }}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={lgProps.radius}
            fill="transparent"
            stroke={remainingColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.05))",
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={lgProps.radius}
            fill="transparent"
            stroke={completedColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={lgProps.circumference}
            initial={{ strokeDashoffset: lgProps.circumference }}
            animate={{ strokeDashoffset: lgProps.dashOffset }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            style={{
              filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.1))",
              vectorEffect: "non-scaling-stroke",
            }}
          />
        </svg>

        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-center">
          <motion.span
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.round(percentage)}%
          </motion.span>
          <span className="text-lg">{label}</span>
        </div>
      </div>

      {/* Additional information below the circle */}
      {additionalInfo.length > 0 && (
        <div className="mt-3 space-y-1 text-center sm:mt-4">
          {additionalInfo.map((info, index) => (
            <div key={index} className="text-xs sm:text-sm font-medium">
              {info.current} / {info.total} {info.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}