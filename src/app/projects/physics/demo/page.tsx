// app/projects/physics/demo/page.tsx

import dynamic from "next/dynamic";

const PhysicsDemo = dynamic(
  () => import("./PhysicsDemoClient"), 
  { ssr: false }
);

export default function Page() {
  return <PhysicsDemo />;
}
