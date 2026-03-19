// @ts-nocheck
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FinanceForm from "@/components/finance/FinanceForm";

export default function ApplyForFinancePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-sky-100 selection:text-sky-900">
      <div className="bg-gray-50/50 pb-24">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Apply For Finance" }]} />
          
          <div className="mt-12 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Content */}
              <div className="lg:col-span-5 space-y-8">
                <h1 className="text-6xl font-black tracking-tight text-gray-900 leading-[1.1]">
                  Apply For Finance
                </h1>
                <p className="text-lg font-medium text-gray-600 leading-relaxed max-w-xl">
                  We can offer you a range of finance options to assist in the purchase of your car. Our rates are very competitive and flexible. To apply, please complete the below form:
                </p>
              </div>

              {/* Right Content - Form Section */}
              <div className="lg:col-span-7">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-black tracking-tight text-gray-800">
                    Vehicle Finance Application
                  </h2>
                  <button className="text-[10px] font-black text-sky-700 underline underline-offset-4 uppercase tracking-widest hover:text-sky-900">
                    What happens if I fill in the form?
                  </button>
                </div>
                
                <FinanceForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
