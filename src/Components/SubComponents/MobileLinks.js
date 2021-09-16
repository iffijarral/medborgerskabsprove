import React, { useState } from "react";
import { NavLinks } from 'Components/SubComponents/NavLinks';
import { MenuToggle } from "Util/MenuToggle";

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="mobileNavLinksContainer">

      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      
      {isOpen && (
        <div className="mobileLinksWrapper">
          <NavLinks />
        </div>
      )}
    </div>
  );
}