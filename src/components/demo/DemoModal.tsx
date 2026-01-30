'use client';

import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">Portfolio Demonstration</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 hover:bg-neutral-100"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-neutral-700">
            This is a portfolio showcase. Checkout and payment processing are disabled.
          </p>
          <p className="mt-2 text-neutral-700">
            All products are AI-generated for demonstration purposes only.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-md bg-neutral-900 py-3 text-white hover:bg-neutral-800"
        >
          I Understand
        </button>
      </div>
    </>
  );
}
