import Card from "@/app/components/card";

const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 ">
          <span className="flex items-center text-red-500 ">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 flex w-auto flex-col justify-center px-10 py-6 ml-0">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-2xl font-bold text-navy-700 ">
          {subtitle}
        </h4>
      </div>
    </Card>
  );
};

export default Widget;
