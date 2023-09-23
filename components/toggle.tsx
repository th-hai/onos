import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react';

export default function Toggle({toggleAll}: {toggleAll: (isAll: boolean) => void}) {
  const [enabled, setEnabled] = useState(true);


  useEffect(() => {
    toggleAll(enabled);
  }, [enabled]);

  return (
    <div className="mx-3">
        <div className="flex items-center">
            <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-[#1F487E] toggle-enable' : 'bg-gray-200'
            } relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6290C8] focus:ring-offset-2`}
            >
            <span
                className={`${
                enabled ? 'translate-x-7' : 'translate-x-1'
                } inline-block h-6 w-6 transform rounded-full bg-white transition-transform`}
            />
            </Switch>
        </div>
    </div>
  )
}

