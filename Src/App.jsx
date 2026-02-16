import React, { useState, useEffect } from "react"; import { motion } from "framer-motion";

/* ============================= BESTVALUE.IN — FINAL POLISHED MVP Clean UI + Smart category detection Footprint & click tracking Ready for real price APIs later ============================= */

const PLATFORMS = [ "Amazon", "Flipkart", "Myntra", "AJIO", "Tata CLiQ", "Croma", "Reliance Digital", "Vijay Sales", "IKEA India", "Pepperfry", "BigBasket", "Blinkit", "DMart", "Swiggy", "Zomato", "Zepto", "Nykaa", "PharmEasy", "Apollo Pharmacy", "Tata 1mg", "Meesho", "BookMyShow", "MakeMyTrip", "RedBus", "Domino’s" ];

const CATEGORY_MAP = [ { key: "Electronics", words: ["smartphone", "mobile", "5g", "gaming phone", "camera phone", "battery backup", "wireless earbuds", "bluetooth headphones", "charger", "power bank", "laptop", "smart watch", "tablet", "smart tv"] }, { key: "Fashion", words: ["men t shirt", "formal shirt", "jeans", "kurta", "saree", "lehenga", "dress", "nightwear", "sports shoes", "sandals", "formal shoes"] }, { key: "Home & Kitchen", words: ["mixer grinder", "pressure cooker", "gas stove", "air fryer", "bedsheets", "curtains", "storage box", "water purifier"] }, { key: "Beauty & Personal Care", words: ["face wash", "sunscreen", "vitamin c serum", "hair oil", "shampoo", "makeup kit", "lipstick", "beard oil"] }, { key: "Baby & Kids", words: ["baby diapers", "baby clothes", "kids toys", "school bag", "baby stroller"] }, { key: "Grocery", words: ["atta", "rice", "cooking oil", "dry fruits", "protein powder", "snacks"] }, { key: "Fitness & Health", words: ["dumbbells", "yoga mat", "resistance band", "massager gun", "multivitamin", "whey protein"] }, { key: "Automobile", words: ["bike helmet", "car vacuum", "seat cover", "dash camera", "mobile holder for car"] }, { key: "Education", words: ["study table", "office chair", "laptop bag", "notebook", "printer"] }, { key: "Gifts", words: ["led lights", "personalized gift", "birthday gift", "photo frame"] } ];

function detectCategory(query) { const q = query.toLowerCase(); for (const cat of CATEGORY_MAP) { if (cat.words.some(w => q.includes(w))) return cat.key; } return "General"; }

function generatePrices() { return PLATFORMS.map(p => ({ platform: p, price: Math.floor(Math.random() * 5000) + 300, coupon: Math.random() > 0.65 ? "SAVE10" : "—" })).sort((a, b) => a.price - b.price); }

export default function BestValueMVP() { const [query, setQuery] = useState(""); const [results, setResults] = useState([]); const [category, setCategory] = useState(""); const [stats, setStats] = useState({ searches: 0, clicks: 0 });

useEffect(() => { const saved = JSON.parse(localStorage.getItem("bestvalue_stats") || "{}" ); if (saved.searches) setStats(saved); }, []);

const saveStats = (s) => localStorage.setItem("bestvalue_stats", JSON.stringify(s));

const handleSearch = () => { if (!query.trim()) return; const cat = detectCategory(query); const prices = generatePrices();

const updated = { ...stats, searches: stats.searches + 1 };
setStats(updated);
saveStats(updated);

setCategory(cat);
setResults(prices);

};

const handleClick = () => { const updated = { ...stats, clicks: stats.clicks + 1 }; setStats(updated); saveStats(updated); };

return ( <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-6"> <div className="max-w-4xl mx-auto"> <h1 className="text-4xl font-bold mb-1">BestValue</h1> <p className="text-gray-600 mb-6">Search once. Get the cheapest deal everywhere.</p>

<div className="flex gap-2 mb-5">
      <input
        className="flex-1 p-3 border rounded-xl"
        placeholder="Search anything – mobiles, grocery, gifts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-indigo-600 text-white px-6 rounded-xl">Search</button>
    </div>

    <div className="text-sm text-gray-700 mb-4">
      Searches: <b>{stats.searches}</b> | Clicks: <b>{stats.clicks}</b>
    </div>

    {category && <div className="mb-4 text-indigo-700">Category: {category}</div>}

    <div className="space-y-3">
      {results.map((r, i) => (
        <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded-2xl shadow flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{r.platform}</h3>
            <p className="text-sm text-green-600">Coupon: {r.coupon}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">₹{r.price}</span>
            <button onClick={handleClick} className="bg-green-500 text-white px-4 py-1 rounded-lg">Buy</button>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="mt-10 bg-white p-4 rounded-2xl shadow text-sm text-gray-600">
      ✅ MVP live for validation. Real prices & affiliate links can be plugged in next.
    </div>
  </div>
</div>

); }
