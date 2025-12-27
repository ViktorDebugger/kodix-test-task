import Image from "next/image";

interface FeatureData {
  title: string;
  icon: string;
  description: string;
}

interface FeatureProps {
  data: FeatureData;
}

export const Feature = ({ data }: FeatureProps) => {
  return (
    <li className="max-w-[230px]">
      <div className="flex items-center gap-2">
        <Image src={data.icon} width={24} height={24} alt="Icon" />
        <h5 className="text-sm font-semibold">{data.title}</h5>
      </div>
      <p className="mt-2 ml-8 text-sm text-[#484848]">{data.description}</p>
    </li>
  );
};
