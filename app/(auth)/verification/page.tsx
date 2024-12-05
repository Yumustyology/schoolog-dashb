import React, { useState } from 'react';
import IsVerified from '@/app/components/molecules/auth/IsVerified';
import IsNotVerified from '@/app/components/molecules/auth/IsNotVerified';

function Verification() {
  const [verify, setVerify] = useState(true);

  if (verify) {
    return <IsVerified />;
  }

  return (
    <div className="py-28 px-14 mx-auto w-full">
      <IsNotVerified title="Verify your account" />
    </div>
  );
}

export default Verification;
