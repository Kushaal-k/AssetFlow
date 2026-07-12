export const Organization = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Organization Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Enterprise company details and metadata settings.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-sm">
        <p className="text-slate-500 dark:text-slate-400">
          Settings for company configuration will load here.
        </p>
      </div>
    </div>
  )
}
