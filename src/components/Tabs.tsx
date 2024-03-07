function Tabs({ tabs, activeTab, toggleTab }: any) {
  return (
    <div className="flex gap-2 border-b-slate-400">
      {tabs?.map((tab) => (
        <button key={tab?.type} onClick={() => toggleTab(tab.type)} className={`${activeTab === tab.type && 'bg-slate-200'} border-2 rounded-md p-1`}>
          {tab.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
