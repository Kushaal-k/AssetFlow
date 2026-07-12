import { SignIn } from '@clerk/clerk-react'
import { ROUTES } from '../../constants'

export const Login = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <SignIn
        signUpUrl={ROUTES.SIGNUP}
        fallbackRedirectUrl={ROUTES.DASHBOARD}
        appearance={{
          elements: {
            rootBox: 'w-full',
            cardBox: 'w-full shadow-none bg-transparent',
            card: 'bg-transparent shadow-none border-0 p-0 w-full',
            headerTitle: 'text-white text-2xl font-black text-center',
            headerSubtitle: 'text-slate-400 text-sm font-medium text-center',
            socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-all',
            formFieldLabel: 'text-slate-300 text-sm font-semibold',
            formFieldInput: 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/60 focus:bg-white/5 h-11 rounded-xl transition-all',
            formButtonPrimary: 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm h-11 border-0',
            footerActionText: 'text-slate-500',
            footerActionLink: 'text-indigo-400 hover:text-indigo-300 font-semibold',
            dividerText: 'text-slate-500',
            dividerLine: 'bg-white/10',
            identityPreviewText: 'text-white',
            identityPreviewEditButtonIcon: 'text-indigo-400',
            selectButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-all',
            formResendCodeLink: 'text-indigo-400 hover:text-indigo-300 font-semibold'
          }
        }}
      />
    </div>
  )
}
export default Login
