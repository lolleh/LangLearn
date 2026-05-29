interface Props {
  title: string
  value: string | number
  subtitle?: string
}

export default function ProgressCard({ title, value, subtitle }: Props) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-sl-green-dark">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-gray-400">{subtitle}</p>}
    </div>
  )
}
