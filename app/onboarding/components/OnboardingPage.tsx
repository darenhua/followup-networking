'use client'

import { useNavigationStore } from '../hooks/useNavigationStore'
import NavigationIndicator from './NavigationIndicator'
import Overview from './pages/Overview'
import SetupAccount from './pages/SetupAccount'
import SetupAppPassword from './pages/SetupAppPassword'
import SetupImap from './pages/SetupImap'
import { Success } from './pages/Success'

export default function OnboardingPage() {
    const { navigationState, next, back } = useNavigationStore()

    return (
        <div className="flex h-screen w-screen flex-col items-center">
            <main className="h-full w-full flex-1">
                {navigationState === -1 && <Overview next={next} />}
                {navigationState === 0 && <SetupImap back={back} next={next} />}
                {navigationState === 1 && <SetupAppPassword back={back} next={next} />}
                {navigationState === 2 && <SetupAccount back={back} next={next} />}
                {navigationState === 3 && <Success />}
            </main>
            <NavigationIndicator navigationState={navigationState} />
        </div>
    )
}
