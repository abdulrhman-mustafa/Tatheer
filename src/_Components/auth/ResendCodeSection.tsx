

import React from 'react';
import { Button } from '@/_Components/ui/Button'; 

interface ResendCodeSectionProps {
  isPhoneNumber: boolean;
  canResend: boolean;
  timer: number;
  loading: boolean;
  handleResendCode: () => Promise<void>;
}

const ResendCodeSection: React.FC<ResendCodeSectionProps> = ({
  isPhoneNumber,
  canResend,
  timer,
  loading,
  handleResendCode,
}) => {
  return (

    <div className="gap-1"> 
      <p className="text-sm text-primary flex items-center">
        Didn’t receive the {isPhoneNumber ? "OTP" : "Email"}?
          <Button
            type="button"
            variant="link"
            onClick={handleResendCode}
            disabled={!canResend || loading} 
            className=" text-secondary font-medium"
          >
            Click here
          </Button>
      </p>
      {!canResend && (
          <p className="text-sm text-secondary ">
            Please wait for <span className="text-red-500 font-semibold">{timer} seconds</span>
          </p>
      )}
    </div>
  );
};

export default ResendCodeSection;
