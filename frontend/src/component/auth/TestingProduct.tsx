'use client'
import { useMemo, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "appliances"
  | "beauty"
  | "book"
  | "box"
  | "check"
  | "chevron"
  | "close"
  | "delete"
  | "edit"
  | "electronics"
  | "eye"
  | "fashion"
  | "home"
  | "image"
  | "mobile"
  | "other"
  | "plus"
  | "products"
  | "search"
  | "settings"
  | "sports"
  | "upload";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="m9 18 6-6-6-6" /></>,
    appliances: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M5 9h14M9 5h.01M15 5h.01" /><circle cx="12" cy="15" r="3" /></>,
    beauty: <><path d="M9 3h6v4l2 3v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-3Z" /><path d="M9 7h6M7 12h10" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5Z" /><path d="M4 5.5v14A1.5 1.5 0 0 0 5.5 21H20" /></>,
    box: <><path d="m21 8-9 5-9-5 9-5 9 5Z" /><path d="m3 8 9 5 9-5v9l-9 5-9-5Z" /><path d="M12 13v9" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    delete: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    edit: <><path d="m14 5 5 5M4 20l4-1 11-11-4-4L4 15v5Z" /></>,
    electronics: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    fashion: <><path d="m8 4 4-2 4 2 5 3-3 5-2-2v11H8V10l-2 2-3-5 5-3Z" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m21 15-5-5L5 20" /></>,
    mobile: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4M11 19h2" /></>,
    other: <><circle cx="12" cy="12" r="9" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    products: <><path d="M4 7h16v14H4zM8 7V4h8v3" /><path d="M4 12h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.37.36.7.6 1 .3.27.7.4 1.1.4h.09v4h-.09a1.7 1.7 0 0 0-1.7.6Z" /></>,
    sports: <><circle cx="12" cy="12" r="9" /><path d="m8 4 3 4-2 4-5 1M16 4l-3 4 2 4 5 1M9 20l3-4 3 4" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 15v5h14v-5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

type CategoryId = "electronics" | "fashion" | "mobile" | "beauty" | "home" | "appliances" | "books" | "sports";
type Category = {
  id: CategoryId;
  name: string;
  description: string;
  icon: IconName;
  tint: string;
  fields: string[];
};

const categories: Category[] = [
  { id: "electronics", name: "Electronics", description: "Audio, cameras and smart devices", icon: "electronics", tint: "violet", fields: ["Brand", "Model number", "Warranty", "Power requirement", "Connectivity", "Included components"] },
  { id: "fashion", name: "Fashion", description: "Clothing, footwear and accessories", icon: "fashion", tint: "rose", fields: ["Brand", "Gender", "Material", "Fit", "Pattern", "Available sizes", "Available colors", "Care instructions"] },
  { id: "mobile", name: "Mobile", description: "Phones, tablets and accessories", icon: "mobile", tint: "blue", fields: ["Brand", "Model name", "RAM", "Storage", "Screen size", "Battery capacity", "Operating system", "Network type"] },
  { id: "beauty", name: "Beauty", description: "Skincare, makeup and wellness", icon: "beauty", tint: "amber", fields: ["Brand", "Skin type", "Concern", "Key ingredients", "Net volume", "Shelf life", "How to use"] },
  { id: "home", name: "Home", description: "Furniture, decor and kitchen", icon: "home", tint: "green", fields: ["Brand", "Material", "Room type", "Assembly required", "Length", "Width", "Height", "Weight"] },
  { id: "appliances", name: "Appliances", description: "Kitchen and household appliances", icon: "appliances", tint: "coral", fields: ["Brand", "Model number", "Warranty", "Energy rating", "Power requirement", "Capacity", "Included components"] },
  { id: "books", name: "Books", description: "Fiction, education and stationery", icon: "book", tint: "indigo", fields: ["Author", "Publisher", "ISBN", "Language", "Format", "Publication year", "Number of pages"] },
  { id: "sports", name: "Sports", description: "Fitness, outdoor and team sports", icon: "sports", tint: "teal", fields: ["Brand", "Sport type", "Material", "Skill level", "Age group", "Available sizes", "Available colors"] },
];

const fieldOptions: Record<string, string[]> = {
  "Operating system": ["Android", "iOS", "Other"],
  "Network type": ["5G", "4G LTE", "Wi-Fi only"],
  Connectivity: ["Bluetooth", "Wi-Fi", "Wired", "USB-C"],
  Gender: ["Men", "Women", "Unisex", "Kids"],
  Fit: ["Regular", "Slim", "Relaxed", "Oversized"],
  "Skin type": ["All skin types", "Dry", "Oily", "Combination", "Sensitive"],
  "Room type": ["Living room", "Bedroom", "Kitchen", "Office", "Outdoor"],
  "Assembly required": ["No", "Yes"],
  Format: ["Paperback", "Hardcover", "E-book", "Audiobook"],
  "Skill level": ["Beginner", "Intermediate", "Advanced", "All levels"],
};

const placeholders: Record<string, string> = {
  Brand: "e.g. Samsung",
  "Model name": "e.g. Galaxy S24",
  RAM: "e.g. 8 GB",
  Storage: "e.g. 256 GB",
  "Screen size": 'e.g. 6.2"',
  "Battery capacity": "e.g. 4,000 mAh",
  Material: "e.g. Organic cotton",
  "Available sizes": "e.g. S, M, L, XL",
  "Available colors": "e.g. Black, Olive, Cream",
  "Net volume": "e.g. 30 ml",
  "Key ingredients": "e.g. Niacinamide, Zinc",
  Weight: "e.g. 1.2 kg",
};

function Field({ label, required = false, placeholder, value, onChange }: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const options = fieldOptions[label];
  return (
    <label className="field">
      <span>{label}{required && <b> *</b>}</span>
      {options ? (
        <select value={value ?? ""} onChange={(event) => onChange?.(event.target.value)}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => <option key={option}>{option}</option>)}
        </select>
      ) : (
        <input value={value ?? ""} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder ?? placeholders[label] ?? `Enter ${label.toLowerCase()}`} />
      )}
    </label>
  );
}

function ProductWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const category = categories.find((item) => item.id === categoryId);

  const setValue = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setImages((current) => [...current, ...Array.from(files).slice(0, 5 - current.length).map((file) => URL.createObjectURL(file))]);
  };

  const submit = () => {
    setSaved(true);
    window.setTimeout(onClose, 1400);
  };

  if (saved) {
    return (
      <div className="wizard success-screen">
        <div className="success-mark"><Icon name="check" size={34} /></div>
        <p className="eyebrow">Catalog updated</p>
        <h1>Product added successfully</h1>
        <p>Your product has been saved as a draft. You can publish it after a final review.</p>
      </div>
    );
  }

  return (
    <div className="wizard">
      <header className="wizard-header">
        <button className="brand" onClick={onClose} aria-label="Return to products"><span>n</span> northstar</button>
        <div className="stepper" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((number) => (
            <div className={`step ${step === number ? "active" : ""} ${step > number ? "done" : ""}`} key={number}>
              <i>{step > number ? <Icon name="check" size={13} /> : number}</i>
              <span>{number === 1 ? "Category" : number === 2 ? "Details" : "Media & price"}</span>
            </div>
          ))}
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
      </header>

      <main className="wizard-body">
        {step === 1 && (
          <section className="category-step">
            <div className="intro">
              <span className="eyebrow">New product</span>
              <h1>What are you selling?</h1>
              <p>Choose the closest category. We’ll tailor the product form so you only see fields that matter.</p>
            </div>
            <div className="category-grid">
              {categories.map((item) => (
                <button key={item.id} className={`category-card ${item.tint} ${categoryId === item.id ? "selected" : ""}`} onClick={() => setCategoryId(item.id)}>
                  <span className="category-icon"><Icon name={item.icon} size={25} /></span>
                  <span className="category-copy"><strong>{item.name}</strong><small>{item.description}</small></span>
                  <span className="category-arrow">{categoryId === item.id ? <Icon name="check" size={18} /> : <Icon name="arrow" size={18} />}</span>
                </button>
              ))}
            </div>
            <div className="help-note"><Icon name="settings" size={18} /><span><strong>Smart product setup</strong> Your next form is tailored to the category you select.</span></div>
          </section>
        )}

        {step === 2 && category && (
          <section className="form-step">
            <div className="section-heading">
              <button className="back-link" onClick={() => setStep(1)}>← Back</button>
              <span className={`mini-category ${category.tint}`}><Icon name={category.icon} size={17} /> {category.name}</span>
              <h1>Tell us about the product</h1>
              <p>Fields are customized for {category.name.toLowerCase()} products.</p>
            </div>

            <div className="form-card">
              <div className="form-card-title"><span>01</span><div><h2>Basic information</h2><p>The details customers see first.</p></div></div>
              <div className="form-grid">
                <div className="wide"><Field label="Product name" required placeholder={category.id === "fashion" ? "e.g. Relaxed linen overshirt" : "e.g. Samsung Galaxy S24"} value={values["Product name"]} onChange={(value) => setValue("Product name", value)} /></div>
                <Field label="SKU" required placeholder="e.g. NS-00124" value={values.SKU} onChange={(value) => setValue("SKU", value)} />
                <Field label="Sub-category" required placeholder="e.g. Smartphones" value={values["Sub-category"]} onChange={(value) => setValue("Sub-category", value)} />
                <label className="field wide"><span>Description <b>*</b></span><textarea rows={4} value={values.Description ?? ""} onChange={(event) => setValue("Description", event.target.value)} placeholder="Describe the product, what makes it special, and who it is for..." /></label>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-title"><span>02</span><div><h2>{category.name} specifications</h2><p>Category-specific details improve search and discovery.</p></div></div>
              <div className="form-grid">
                {category.fields.map((field) => <Field key={field} label={field} value={values[field]} onChange={(value) => setValue(field, value)} />)}
              </div>
            </div>
          </section>
        )}

        {step === 3 && category && (
          <section className="form-step">
            <div className="section-heading">
              <button className="back-link" onClick={() => setStep(2)}>← Back</button>
              <span className={`mini-category ${category.tint}`}><Icon name={category.icon} size={17} /> {category.name}</span>
              <h1>Add media and pricing</h1>
              <p>Upload clear product images, then set inventory and price.</p>
            </div>
            <div className="media-layout">
              <div className="form-card media-card">
                <div className="form-card-title"><span>03</span><div><h2>Product images</h2><p>Add up to 5 JPG, PNG or WEBP images.</p></div></div>
                <button className="drop-zone" onClick={() => fileRef.current?.click()}>
                  <span><Icon name="upload" size={24} /></span>
                  <strong>Drop images here or browse</strong>
                  <small>1200 × 1200 px recommended</small>
                </button>
                <input ref={fileRef} className="hidden-input" type="file" accept="image/*" multiple onChange={(event) => handleFiles(event.target.files)} />
                {images.length > 0 && <div className="image-list">{images.map((src, index) => <div key={src}><img src={src} alt={`Product upload ${index + 1}`} /><button onClick={() => setImages((all) => all.filter((_, itemIndex) => itemIndex !== index))}><Icon name="close" size={14} /></button></div>)}</div>}
              </div>
              <div className="form-card">
                <div className="form-card-title"><span>04</span><div><h2>Price & inventory</h2><p>Configure the default selling variant.</p></div></div>
                <div className="form-grid">
                  <Field label="Selling price (₹)" required placeholder="2,499" value={values.Price} onChange={(value) => setValue("Price", value)} />
                  <Field label="Cost price (₹)" placeholder="1,450" value={values.Cost} onChange={(value) => setValue("Cost", value)} />
                  <Field label="Stock quantity" required placeholder="100" value={values.Stock} onChange={(value) => setValue("Stock", value)} />
                  <Field label="Low stock alert" placeholder="10" value={values.Alert} onChange={(value) => setValue("Alert", value)} />
                </div>
                <button className="variant-button"><Icon name="plus" size={18} /> Add another variant</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="wizard-footer">
        <p>{step === 1 ? "You can change this later in product settings." : step === 2 ? "All details are saved while you continue." : "Your product will be saved as a draft."}</p>
        <div>
          <button className="secondary-button" onClick={step === 1 ? onClose : () => setStep((current) => current - 1)}>{step === 1 ? "Cancel" : "Back"}</button>
          <button className="primary-button" disabled={step === 1 && !categoryId} onClick={() => step < 3 ? setStep((current) => current + 1) : submit()}>
            {step === 1 ? "Continue to details" : step === 2 ? "Continue to media" : "Save product"} <Icon name={step === 3 ? "check" : "chevron"} size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
}

const mockProducts = [
  { name: "Aura noise-cancelling headphones", sku: "AUD-2941", price: "₹12,499", stock: 84, category: "Electronics", tint: "violet" },
  { name: "Linen camp-collar shirt", sku: "FSH-1178", price: "₹2,299", stock: 16, category: "Fashion", tint: "rose" },
  { name: "Vitamin C brightening serum", sku: "BTY-4482", price: "₹899", stock: 42, category: "Beauty", tint: "amber" },
];

export default function App() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [catalog, setCatalog] = useState(mockProducts);
  const [notice, setNotice] = useState("");
  const products = useMemo(() => catalog.filter((item) => `${item.name} ${item.sku}`.toLowerCase().includes(search.toLowerCase())), [catalog, search]);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };

  if (wizardOpen) return <ProductWizard onClose={() => setWizardOpen(false)} />;

  return (
    <div className="app-shell">
      <main className="dashboard">
        <header>
          <div><p>Catalog management</p><h1>Products</h1><span className="header-description">Create, review and manage your store products.</span></div>
          <button className="primary-button" onClick={() => setWizardOpen(true)}><Icon name="plus" size={18} /> Add product</button>
        </header>
        <section className="products-panel">
          <div className="panel-tools"><div><h2>Product catalog</h2><p>View and maintain your product information.</p></div><label className="search"><Icon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." /></label></div>
          <div className="product-table">
            <div className="table-row table-head"><span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Actions</span></div>
            {products.map((product) => (
              <div className="table-row" key={product.sku}>
                <span className="product-name"><i className={product.tint}><Icon name="image" /></i><span><strong>{product.name}</strong><small>{product.sku}</small></span></span>
                <span><i className={`pill ${product.tint}`}>{product.category}</i></span>
                <strong>{product.price}</strong>
                <span>{product.stock} units</span>
                <span className="row-actions">
                  <button className="view-action" onClick={() => showNotice(`Viewing ${product.name}`)} aria-label={`View ${product.name}`}><Icon name="eye" size={16} /> View</button>
                  <button className="edit-action" onClick={() => setWizardOpen(true)} aria-label={`Update ${product.name}`}><Icon name="edit" size={16} /> Update</button>
                  <button className="delete-action" onClick={() => setCatalog((current) => current.filter((item) => item.sku !== product.sku))} aria-label={`Delete ${product.name}`}><Icon name="delete" size={16} /> Delete</button>
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      {notice && <div className="notice"><Icon name="eye" size={17} /> {notice}</div>}
    </div>
  );
}
