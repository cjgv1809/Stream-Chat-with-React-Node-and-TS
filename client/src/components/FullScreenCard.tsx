import React from "react";

type FullScreenCardProps = {
  children: React.ReactNode;
};

function FullScreenCard({ children }: FullScreenCardProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

FullScreenCard.Body = function FullScreenCardBody({
  children,
}: FullScreenCardProps) {
  return <div className="bg-white rounded-lg shadow-lg p-6">{children}</div>;
};

FullScreenCard.BelowCard = function FullScreenCardBody({
  children,
}: FullScreenCardProps) {
  return <div className="mt-2 flex justify-center gap-3">{children}</div>;
};

export default FullScreenCard;
