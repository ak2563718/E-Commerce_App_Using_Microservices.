'use client'
import { useAppDispatch } from "@/redux/hooks";
import { getUserOrder } from "@/redux/order/order.Action";
import { useState, useMemo, useEffect } from "react";
const PINK = "#e91e8c";
const PINK_DARK = "#c2185b";
const PINK_LIGHT = "#fce4ec";
const PINK_MID = "#f8bbd0";

type OrderStatus = "DELIVERED" | "OUT_FOR_DELIVERY" | "PROCESSING" | "SHIPPED" | "CANCELLED"|"PENDING";

interface OrderItem {
  name: string;
  variant: string;
  qty: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  estimatedDelivery?: string;
}

const allOrders: Order[] = [
  {
    id: "ORD-2026-84710",
    date: "Sep 3, 2026",
    status: "OUT_FOR_DELIVERY",
    total: 391.5,
    estimatedDelivery: "Sep 8, 2026",
    items: [
      {
        name: "Silk Bloom Midi Dress",
        variant: "Blush Pink · Size M",
        qty: 1,
        price: 189,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=80&h=80&fit=crop&auto=format",
      },
      {
        name: "Linen Tote Bag",
        variant: "Ivory · One Size",
        qty: 2,
        price: 64.5,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=80&h=80&fit=crop&auto=format",
      },
      {
        name: "Pearl Drop Earrings",
        variant: "Gold · Pair",
        qty: 1,
        price: 42,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "ORD-2026-79341",
    date: "Aug 28, 2026",
    status: "DELIVERED",
    total: 128.0,
    items: [
      {
        name: "Wireless Noise-Cancelling Headphones",
        variant: "Midnight Black",
        qty: 1,
        price: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "ORD-2026-77820",
    date: "Aug 21, 2026",
    status: "PENDING",
    total: 214.0,
    items: [
      {
        name: "Ceramic Pour-Over Coffee Set",
        variant: "Matte White",
        qty: 1,
        price: 94,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop&auto=format",
      },
      {
        name: "Organic Cotton Throw Blanket",
        variant: "Oatmeal · 50×60\"",
        qty: 2,
        price: 60,
        image: "https://images.unsplash.com/photo-1600369671236-d1f08c3e0e54?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "ORD-2026-75108",
    date: "Aug 15, 2026",
    status: "SHIPPED",
    total: 89.99,
    estimatedDelivery: "Sep 10, 2026",
    items: [
      {
        name: "Leather Journal Notebook",
        variant: "Dark Brown · A5",
        qty: 1,
        price: 44.99,
        image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=80&h=80&fit=crop&auto=format",
      },
      {
        name: "Botanical Scented Candle",
        variant: "Jasmine & Sandalwood",
        qty: 1,
        price: 45,
        image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "ORD-2026-71233",
    date: "Aug 8, 2026",
    status: "PROCESSING",
    total: 56.0,
    estimatedDelivery: "Sep 12, 2026",
    items: [
      {
        name: "Vitamin C Serum",
        variant: "30ml",
        qty: 2,
        price: 28,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "ORD-2026-68904",
    date: "Jul 29, 2026",
    status: "CANCELLED",
    total: 175.0,
    items: [
      {
        name: "Running Shoes",
        variant: "White/Coral · Size 8",
        qty: 1,
        price: 175,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop&auto=format",
      },
    ],
  },
];

const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string; dot: string }> = {
  DELIVERED: { label: "DELIVERED", bg: "#e8f5e9", text: "#2e7d32", dot: "#43a047" },
  "OUT_FOR_DELIVERY": { label: "OUT_FOR_DELIVERY", bg: PINK_LIGHT, text: PINK_DARK, dot: PINK },
  SHIPPED: { label: "SHIPPED", bg: "#e3f2fd", text: "#1565c0", dot: "#1e88e5" },
  PROCESSING: { label: "PROCESSING", bg: "#f3e5f5", text: "#6a1b9a", dot: "#8e24aa" },
  CANCELLED: { label: "CANCELLED", bg: "#fafafa", text: "#757575", dot: "#9e9e9e" },
  PENDING:{label:"PENDING",bg:"#ccccdd", text:"#524731",dot:"rgba(67, 77, 67, 0.6)"}
};

type Tab = "All" | "Active" | "DELIVERED" | "CANCELLED";

export default function OrdersList() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [allOrders, setallOrders] = useState<Order[]>([])
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const dispatch = useAppDispatch();
  
  useEffect(()=>{
    const getOrder =async()=>{
      const res = await dispatch(getUserOrder()).unwrap();
      setallOrders(res.data)
    }
    getOrder()
  },[])


  const filtered = useMemo(() => {
    let result = allOrders;

    if (activeTab === "Active") {
      result = result.filter((o) =>
        ["OUT_FOR_DELIVERY", "SHIPPED", "PROCESSING"].includes(o.status)
      );
    } else if (activeTab === "DELIVERED") {
      result = result.filter((o) => o.status === "DELIVERED");
    } else if (activeTab === "CANCELLED") {
      result = result.filter((o) => o.status === "CANCELLED");
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.items.some((item) => item.name.toLowerCase().includes(q) || item.variant.toLowerCase().includes(q))
      );
    }

    return result;
  }, [allOrders,search, activeTab]);
  console.log(filtered)

  // const tabs: Tab[] = ["All", "Active", "DELIVERED", "CANCELLED"];
  // const tabCounts: Record<Tab, number> = {
  //   All: allOrders.length,
  //   Active: allOrders.filter((o) => ["OUT_FOR_DELIVERY", "SHIPPED", "PROCESSING"].includes(o.status)).length,
  //   DELIVERED: allOrders.filter((o) => o.status === "DELIVERED").length,
  //   CANCELLED: allOrders.filter((o) => o.status === "CANCELLED").length,
  // };

  return (
    <div style={{ minHeight: "100vh", background: "#fdf0f8", fontFamily: "Poppins, sans-serif" }}>
      {/* Page body */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "28px 20px" }}>
        {/* Title row */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "22px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>
            My Orders
            <span style={{ fontSize: "14px", fontWeight: 500, color: "#aaa", marginLeft: "10px" }}>
              ({allOrders.length} orders)
            </span>
          </h1>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1.5px solid #f3e0ed",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
            boxShadow: "0 2px 8px rgba(233,30,140,0.06)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" stroke={PINK} strokeWidth="2.2" fill="none" strokeLinecap="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by product name or order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "13.5px",
              color: "#1a1a2e",
              fontFamily: "Poppins, sans-serif",
              padding: "13px 0",
              background: "transparent",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: "2px", display: "flex" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter tabs */}
        {/* <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "20px",
            background: "#fff",
            borderRadius: "12px",
            padding: "6px",
            border: "1.5px solid #f3e0ed",
            width: "fit-content",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 18px",
                borderRadius: "8px",
                border: "none",
                fontFamily: "Poppins, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s",
                background: activeTab === tab ? `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)` : "transparent",
                color: activeTab === tab ? "#fff" : "#888",
                boxShadow: activeTab === tab ? "0 3px 10px rgba(233,30,140,0.28)" : "none",
              }}
            >
              {tab}
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  background: activeTab === tab ? "rgba(255,255,255,0.25)" : PINK_LIGHT,
                  color: activeTab === tab ? "#fff" : PINK_DARK,
                  borderRadius: "999px",
                  padding: "1px 7px",
                }}
              >
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div> */}

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "64px 20px",
              textAlign: "center",
              border: "1.5px solid #f3e0ed",
            }}
          >
            <div style={{ fontSize: "60px", marginBottom: "14px" }}>📦</div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>
              No orders found
            </h2>
            <p style={{ fontSize: "13px", color: "#aaa", margin: 0 }}>
              {search ? `No results for "${search}"` : "You have no orders in this category."}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered?.map((order) => {
              const sc = statusConfig[order.status];
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    border: "1.5px solid #f3e0ed",
                    padding: "18px 20px",
                    cursor: "pointer",
                    transition: "box-shadow 0.18s, border-color 0.18s",
                    boxShadow: "0 2px 10px rgba(233,30,140,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(233,30,140,0.15)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = PINK_MID;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(233,30,140,0.05)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#f3e0ed";
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 700, color: "#1a1a2e" }}>{order.id}</p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>{order.date}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: sc.bg,
                          color: sc.text,
                          borderRadius: "999px",
                          padding: "4px 12px",
                          fontSize: "11.5px",
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: sc.dot, flexShrink: 0 }} />
                        {sc.label}
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <div
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            border: "1.5px solid #f3e0ed",
                            background: PINK_LIGHT,
                            flexShrink: 0,
                          }}
                        >
                          <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "10px",
                          background: PINK_LIGHT,
                          border: `1.5px dashed ${PINK_MID}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: PINK_DARK,
                          flexShrink: 0,
                        }}
                      >
                        +{order.items.length - 3}
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0, paddingLeft: "4px" }}>
                      <p style={{ margin: "0 0 2px", fontSize: "13px", fontWeight: 600, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {order.items[0].name}
                        {order.items.length > 1 && (
                          <span style={{ fontWeight: 400, color: "#aaa" }}> +{order.items.length - 1} more</span>
                        )}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "#aaa" }}>{order.items[0].variant}</p>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: "1px solid #f3e0ed",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "11px", color: "#aaa", fontWeight: 500 }}>
                        {order.items.reduce((s, i) => s + i.qty, 0)} item{order.items.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}
                      </span>
                      {order.estimatedDelivery && order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                        <>
                          <span style={{ color: "#ddd" }}>·</span>
                          <span style={{ fontSize: "11px", color: PINK, fontWeight: 600 }}>
                            Est. {order.estimatedDelivery}
                          </span>
                        </>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 800, color: "#1a1a2e" }}>
                        ${order?.total?.toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedOrderId(order.id); }}
                        style={{
                          background: `linear-gradient(135deg, ${PINK} 0%, ${PINK_DARK} 100%)`,
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "7px 18px",
                          fontSize: "12px",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 700,
                          cursor: "pointer",
                          boxShadow: "0 3px 10px rgba(233,30,140,0.28)",
                          transition: "opacity 0.15s",
                          letterSpacing: "0.01em",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
