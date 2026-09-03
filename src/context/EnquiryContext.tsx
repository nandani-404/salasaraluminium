'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnquiryContextType {
  isOpen: boolean;
  selectedProduct?: string;
  selectedSegment?: string;
  openEnquiryModal: (productOrOptions?: string | { product?: string; segment?: string }) => void;
  closeEnquiryModal: () => void;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(undefined);
  const [selectedSegment, setSelectedSegment] = useState<string | undefined>(undefined);

  const openEnquiryModal = (productOrOptions?: string | { product?: string; segment?: string }) => {
    if (typeof productOrOptions === 'string') {
      setSelectedProduct(productOrOptions);
      setSelectedSegment(undefined);
    } else {
      setSelectedProduct(productOrOptions?.product);
      setSelectedSegment(productOrOptions?.segment);
    }
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
    setSelectedProduct(undefined);
    setSelectedSegment(undefined);
  };

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        selectedProduct,
        selectedSegment,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
}
