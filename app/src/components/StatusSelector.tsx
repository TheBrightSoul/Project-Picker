import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";

interface StatusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const statuses: string[] = [
  "Don't want to Start it yet",
  "Will Do Soon",
  "Working on it",
  "Completed",
];

export default function StatusSelector({
  value,
  onChange,
}: StatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    value || statuses[0]
  );

  const handleChange = (status: string) => {
    setSelectedStatus(status);
    onChange(status);
  };

  return (
    <div className="w-full space-y-2">
      <label className="text-xs font-medium text-hacker-text-light dark:text-hacker-text-dark">
        Status:
      </label>

      <Listbox value={selectedStatus} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded px-3 py-1.5 text-left text-sm transition",
              "bg-[rgba(0,255,159,0.08)] dark:bg-[rgba(0,255,159,0.12)]",
              "border border-hacker-border-light dark:border-hacker-border-dark",
              "text-hacker-text-light dark:text-hacker-text-dark",
              "focus:outline-none focus:ring-2 focus:ring-neon-green",
              "shadow-inner hover:shadow-[0_0_4px_rgba(0,255,159,0.3)]"
            )}
          >
            <span>{selectedStatus}</span>
            <ChevronUpDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neon-green" />
          </Listbox.Button>

          <Listbox.Options
            className={clsx(
              "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-hacker-text-light text-sm shadow-lg",
              "bg-hacker-card-light dark:bg-hacker-card-dark",
              "border border-hacker-border-light dark:border-hacker-border-dark",
              "focus:outline-none focus:ring-0 focus:border-transparent"
            )}
          >
            {statuses.map((status) => (
              <Listbox.Option
                key={status}
                value={status}
                className={({ active, selected }) =>
                  clsx(
                    "cursor-pointer select-none px-3 py-1",
                    active
                      ? "bg-neon-green/20 text-hacker-text-light dark:text-hacker-text-dark text-shadow-md shadow-hacker-bg-light dark:shadow-hacker-bg-dark"
                      : "text-hacker-text-light dark:text-hacker-text-dark",
                    selected && "font-semibold"
                  )
                }
              >
                {status}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
