import React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";

const Icon = ({ name, size = 24, className = "" }) => {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return (
    <HugeiconsIcon 
      icon={IconComponent} 
      size={size} 
      className={className}
      strokeWidth={1.5}
    />
  );
};

export default Icon;
