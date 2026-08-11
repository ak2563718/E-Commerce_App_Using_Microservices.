'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Edit2, Trash2, Eye, Upload, X, ChevronRight, ChevronDown, ImagePlus, Layers, Loader2, Loader } from 'lucide-react'
import { topProducts } from './data'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllCategories } from '@/redux/category/category.Action'
import { createProduct, deleteProductbyId, getAllProducts, sellerProduct } from '@/redux/product/product.Action'
import { uploadProductImage, uploadProductVariantImages } from '@/redux/product/product.Type.Action'
import { toast } from 'sonner'
import { createVariants } from '@/redux/productvariants/variants.Action'
import UpdateProduct from './UpdateProduct'
import { useRouter } from 'next/navigation'
import { LoaderOne } from '@/components/ui/loader'
import ProductLoading from '../skeleton&Loader/ProductLoading'

  
// ── Field helpers ────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold text-gray-600 tracking-wide">{children}</label>
}

function Input({ placeholder, value, onChange, type = 'text' }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
      style={{ border: '1.5px solid #e9d5ff', background: '#faf5ff', color: '#111' }}
      onFocus={e => { e.currentTarget.style.border = '1.5px solid #7c3aed'; e.currentTarget.style.background = '#fff' }}
      onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.background = '#faf5ff' }}
    />
  )
}

// ── Image uploader ───────────────────────────────────────────────────────────
function ImageUploader({ images, onAdd, onRemove, label = 'Product Images' }: {
  images: File[]; onAdd: (file: File) => void; onRemove: (i: number) => void; label?: string
}) {
  const ref = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onAdd(file)
    e.target.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {images.map((file, i) => (
          <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden group" style={{ border: '1.5px solid #e9d5ff' }}>
            <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => onRemove(i)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(26,5,51,0.55)' }}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <button
            onClick={() => ref.current?.click()}
            className="w-20 h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all hover:border-purple-400 hover:bg-purple-50"
            style={{ border: '1.5px dashed #c4b5fd', background: '#faf5ff' }}
          >
            <ImagePlus className="w-5 h-5" style={{ color: '#a78bfa' }} />
            <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>Add</span>
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400">Up to 5 images · JPG, PNG, WEBP</p>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

// ── Variant form ─────────────────────────────────────────────────────────────
interface Variant {
  sku: string; price: string; stock: string; images: File[]
}

function VariantCard({ index, variant, onChange, onRemove }: {
  index: number; variant: Variant; onChange: (v: Variant) => void; onRemove: () => void
}) {
  return (
    <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: '#f3e8ff', border: '1.5px solid #ddd6fe' }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-purple-700 uppercase tracking-widest">Variant {index + 1}</span>
        <button onClick={onRemove} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors">
          <X className="w-3.5 h-3.5 text-red-400" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <Label>SKU</Label>
          <Input placeholder="VAR-001" value={variant.sku} onChange={v => onChange({ ...variant, sku: v })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Price (₹)</Label>
          <Input placeholder="999" type="number" value={variant.price} onChange={v => onChange({ ...variant, price: v })} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Stock</Label>
          <Input placeholder="50" type="number" value={variant.stock} onChange={v => onChange({ ...variant, stock: v })} />
        </div>
      </div>
      <ImageUploader
        images={variant.images}
        onAdd={url => onChange({ ...variant, images: [...variant.images, url] })}
        onRemove={i => onChange({ ...variant, images: variant.images.filter((_, idx) => idx !== i) })}
        label="Variant Images"
      />
    </div>
  )
}

// ── Step 1: Details ──────────────────────────────────────────────────────────
function StepDetails({ onNext, onClose }: { onNext: () => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [sku, setSku] = useState('')
  const [category, setCategory] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [desc, setDesc] = useState('')
  const [catOpen, setCatOpen] = useState(false)
  const [subCatOpen, setSubCatOpen] = useState(false)

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category)
  const { loading } = useAppSelector((state)=>state.product)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  // Derived values — computed on every render, no side effects needed
  const topLevelCategories = categories?.filter((c) => c.parentId === null) ?? []
  const subCategories = categoryId
    ? categories?.filter((c) => c.id === categoryId) ?? []
    : []
  const hasSubCategories = subCategories[0]?.children.length > 0


  const handleSelectCategory = (cat: { id: string; name: string }) => {
    setCategory(cat.name)
    setCategoryId(cat.id)
    setCatOpen(false)
    // reset subcategory whenever the parent category changes
    setSubCategoryName('')
    setSubCategoryId('')
  }

  const handleSelectSubCategory = (cat: { id: string; name: string }) => {
    setSubCategoryName(cat.name)
    setSubCategoryId(cat.id)
    setSubCatOpen(false)
  }
  const handleContinue=async()=>{
    try {
      const res = await dispatch(createProduct({name,sku,description:desc,categoryId:subCategoryId?subCategoryId:categoryId})).unwrap()
      toast.success(res.message)
      onNext()
    } catch (error:any) { 
      toast.error(error)
    } 
  }

  if(loading){
    return (
      <div className='flex jutify-center'>
    <LoaderOne />
    </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Add New Product</h2>
          <p className="text-xs text-gray-400 mt-0.5">Step 1 of 2 — Product Details</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        <div className="h-1 flex-1 rounded-full" style={{ background: '#7c3aed' }} />
        <div className="h-1 flex-1 rounded-full" style={{ background: '#e9d5ff' }} />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Product Name</Label>
        <Input placeholder="e.g. Wireless Noise-Cancelling Headphones" value={name} onChange={setName} />
      </div>

      <div className="flex flex-col gap-1">
        <Label>SKU</Label>
        <Input placeholder="e.g. ELEC-WH-001" value={sku} onChange={setSku} />
      </div>

      {/* Category dropdown */}
      <div className="flex flex-col gap-1 relative">
        <Label>Category</Label>
        <button
          onClick={() => setCatOpen(o => !o)}
          className="w-full px-3 py-2.5 rounded-xl text-sm text-left flex items-center justify-between transition-all"
          style={{
            border: catOpen ? '1.5px solid #7c3aed' : '1.5px solid #e9d5ff',
            background: catOpen ? '#fff' : '#faf5ff',
            color: category ? '#111' : '#9ca3af',
          }}
        >
          {category || 'Select a category'}
          <ChevronDown className="w-4 h-4 text-gray-400 transition-transform" style={{ transform: catOpen ? 'rotate(180deg)' : 'none' }} />
        </button>
        {catOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 flex flex-col"
            style={{ background: '#fff', border: '1.5px solid #e9d5ff', boxShadow: '0 8px 24px rgba(124,58,237,0.15)', maxHeight: 200, overflowY: 'auto' }}
          >
            {topLevelCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className="px-4 py-2.5 text-sm text-left transition-colors hover:bg-purple-50"
                style={{ color: categoryId === cat.id ? '#7c3aed' : '#374151', fontWeight: categoryId === cat.id ? 600 : 400 }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sub-category dropdown — only shown when the selected category has children */}
      {hasSubCategories && (
        <div className="flex flex-col gap-1 relative">
          <Label>Sub-Category</Label>
          <button
            onClick={() => setSubCatOpen(o => !o)}
            className="w-full px-3 py-2.5 rounded-xl text-sm text-left flex items-center justify-between transition-all"
            style={{
              border: subCatOpen ? '1.5px solid #7c3aed' : '1.5px solid #e9d5ff',
              background: subCatOpen ? '#fff' : '#faf5ff',
              color: subCategoryName ? '#111' : '#9ca3af',
            }}
          >
            {subCategoryName || 'Select a sub-category'}
            <ChevronDown className="w-4 h-4 text-gray-400 transition-transform" style={{ transform: subCatOpen ? 'rotate(180deg)' : 'none' }} />
          </button>
          {subCatOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 flex flex-col"
              style={{ background: '#fff', border: '1.5px solid #e9d5ff', boxShadow: '0 8px 24px rgba(124,58,237,0.15)', maxHeight: 200, overflowY: 'auto' }}
            >
              {Array.isArray(subCategories[0]?.children) && subCategories[0]?.children.map((cat:any) => (
                <button
                  key={cat.id}
                  onClick={() => handleSelectSubCategory(cat)}
                  className="px-4 py-2.5 text-sm text-left transition-colors hover:bg-purple-50"
                  style={{ color: subCategoryId === cat.id ? '#7c3aed' : '#374151', fontWeight: subCategoryId === cat.id ? 600 : 400 }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <Label>Description</Label>
        <textarea
          placeholder="Describe your product — features, materials, dimensions..."
          value={desc}
          onChange={e => setDesc(e.target.value)}
          rows={4}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
          style={{ border: '1.5px solid #e9d5ff', background: '#faf5ff', color: '#111', lineHeight: 1.6 }}
          onFocus={e => { e.currentTarget.style.border = '1.5px solid #7c3aed'; e.currentTarget.style.background = '#fff' }}
          onBlur={e => { e.currentTarget.style.border = '1.5px solid #e9d5ff'; e.currentTarget.style.background = '#faf5ff' }}
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50" style={{ border: '1.5px solid #e9d5ff' }}>
          Cancel
        </button>
       <button
          onClick={handleContinue}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
         {loading ? <Loader className='w-4 h-4'/> : (<>Continue <ChevronRight className="w-4 h-4" /></>)}
        </button>
      </div>
    </div>
  )
}

// ── Step 2: Images, Pricing & Variants ──────────────────────────────────────
function StepMedia({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  const [images, setImages] = useState<File[]>([])
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [variants, setVariants] = useState<Variant[]>([])
  const [showVariants, setShowVariants] = useState(false)
  const { aproduct, loading } = useAppSelector((state)=>state.product) 
  const dispatch = useAppDispatch();
  const addVariant = () => {
    setVariants(v => [...v, { sku: '', price: '', stock: '', images: [] }])
    setShowVariants(true)
  }

  const updateVariant = (i: number, v: Variant) => setVariants(vs => vs.map((x, idx) => idx === i ? v : x))
  const removeVariant = (i: number) => {
    const next = variants.filter((_, idx) => idx !== i)
    setVariants(next)
    if (next.length === 0) setShowVariants(false)
  }

  const handleSubmit=async()=>{
    try {
    const formData = new FormData();
    images.forEach((img)=>{
      formData.append('images',img)
    })
    const uploadPIRes = await dispatch(uploadProductImage({id:aproduct.id,formData})).unwrap() 
    const response = await dispatch(createVariants({id:aproduct.id,sku:aproduct.sku,price,stock})).unwrap()

    if(variants.length >0){
    for (const variant of variants) {
    const response = await dispatch(
      createVariants({
        id: aproduct.id,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
      })
    ).unwrap();
    console.log(response)
      const formData = new FormData();
      variant.images.forEach((img) => {
        formData.append("images", img);
      });
      await dispatch(uploadProductVariantImages({id: response.data.id, formData})).unwrap();
    }
  }
    await dispatch(sellerProduct());
    toast.success("Product add Successfully")
    onClose()
    } catch (error:any) {
      console.log(error)
      toast.error(error)
    }
  }

  
  if(loading){
    return (
      <div className='flex jutify-center'>
    <LoaderOne />
    </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>Add New Product</h2>
          <p className="text-xs text-gray-400 mt-0.5">Step 2 of 2 — Images & Pricing</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        <div className="h-1 flex-1 rounded-full" style={{ background: '#7c3aed' }} />
        <div className="h-1 flex-1 rounded-full" style={{ background: '#7c3aed' }} />
      </div>

      {/* Product images */}
      <ImageUploader
        images={images}
        onAdd={url => setImages(i => [...i, url])}
        onRemove={i => setImages(imgs => imgs.filter((_, idx) => idx !== i))}
      />

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <Label>Price (₹)</Label>
          <Input placeholder="e.g. 1999" type="number" value={price} onChange={setPrice} />
        </div>
        <div className="flex flex-col gap-1">
          <Label>Stock Quantity</Label>
          <Input placeholder="e.g. 100" type="number" value={stock} onChange={setStock} />
        </div>
      </div>

      {/* Variants */}
      {showVariants && variants.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" style={{ color: '#7c3aed' }} />
            <span className="text-sm font-bold text-gray-700">Product Variants</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: '#f3e8ff', color: '#7c3aed' }}>{variants.length}</span>
          </div>
          {variants.map((v, i) => (
            <VariantCard key={i} index={i} variant={v} onChange={upd => updateVariant(i, upd)} onRemove={() => removeVariant(i)} />
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-500 transition-all hover:bg-gray-50"
          style={{ border: '1.5px solid #e9d5ff' }}
        >
          Back
        </button>

        <button
          onClick={addVariant}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:bg-purple-50"
          style={{ border: '1.5px solid #7c3aed', color: '#7c3aed' }}
        >
          <Layers className="w-4 h-4" /> Add Variant
        </button>

        <button
          onClick={handleSubmit}
          className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
        >
          {loading?<Loader className='w-4 h-4'/> :(<><Upload className="w-4 h-4" /> Add Product</>)}
        </button>
      </div>
    </div>
  )
}

// ── Modal shell ──────────────────────────────────────────────────────────────
function AddProductModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(26,5,51,0.55)', backdropFilter: 'blur(4px)' }}>
      <div
        className="bg-white rounded-2xl w-full flex flex-col overflow-y-auto"
        style={{ maxWidth: 500, maxHeight: '90vh', boxShadow: '0 24px 64px rgba(124,58,237,0.28)', padding: '28px' }}
      >
        {step === 1
          ? <StepDetails onNext={() => setStep(2)} onClose={onClose} />
          : <StepMedia onBack={() => setStep(1)} onClose={onClose} />
        }
      </div>
    </div>
  )
}

// ── Main Products page ───────────────────────────────────────────────────────
export default function Products() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const dispatch = useAppDispatch();
  const { products , message, error} = useAppSelector((state)=>state.product)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(()=>{
    const getProduct =async()=>{
      const res = await dispatch(sellerProduct()).unwrap();
      setLoading(false)
    }
    getProduct()
  },[dispatch])
 

 const filtered =  products?.filter((p) => {
  const searchTerm = search.toLowerCase();

  return (
    p.name.toLowerCase().includes(searchTerm) ||
    p.sku.toLowerCase().includes(searchTerm)
  );
});

if(loading){
  return <ProductLoading/>
}

return (
  <div className="space-y-6 p-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1
          className="text-2xl font-black text-gray-900"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          Products
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          {products?.length} products ·{" "}
          {
           Array.isArray(products) && products?.filter((p) => (p.variants?.[0]?.stock ?? 0) < 20)
              .length
          }{" "}
          low stock
        </p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
        }}
      >
        Add Product
      </button>
    </div>

    {/* Search */}
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl max-w-sm"
      style={{
        background: "#fff",
        border: "1px solid #e9d5ff",
      }}
    >
      <Search className="w-4 h-4 text-gray-400" />

      <input
        className="flex-1 text-sm outline-none bg-transparent text-gray-700"
        placeholder="Search products or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Product grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.isArray(filtered) && filtered?.map((p) => {
        const variant = p.variants?.[0];

        const price = Number(variant?.price ?? 0);
        const stock = variant?.stock ?? 0;

        const image = p.images?.[0]?.url;

        return (
          <div
            key={p.id}
            className="rounded-2xl p-5 flex flex-col gap-3 group transition-all hover:-translate-y-0.5"
            style={{
              background: "#fff",
              border: "1px solid #f0ebff",
              boxShadow: "0 1px 8px rgba(124,58,237,0.06)",
            }}
          >
            {/* Product Image */}
            <div
              className="w-full h-40 rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #f3e8ff, #ede9fe)",
              }}
            >
              {image ? (
                <img
                  src={image}
                  alt={p.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-400 text-sm">
                  No image
                </div>
              )}
            </div>

            {/* Product information */}
            <div>
              <h3
                className="font-bold text-gray-800 text-sm leading-snug"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {p.name}
              </h3>

              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {p.sku}
              </p>
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-2 gap-2">
              {/* Price */}
              <div
                className="rounded-lg p-3"
                style={{ background: "#faf5ff" }}
              >
                <div
                  className="text-sm font-black"
                  style={{ color: "#7c3aed" }}
                >
                  ₹{price.toLocaleString("en-IN")}
                </div>

                <div className="text-xs text-gray-400 mt-0.5">
                  Price
                </div>
              </div>

              {/* Stock */}
              <div
                className="rounded-lg p-3"
                style={{ background: "#faf5ff" }}
              >
                <div
                  className="text-sm font-black"
                  style={{
                    color: stock < 20 ? "#dc2626" : "#7c3aed",
                  }}
                >
                  {stock}
                </div>

                <div className="text-xs text-gray-400 mt-0.5">
                  Stock
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="flex items-center justify-between pt-2 border-t"
              style={{ borderColor: "#f3e8ff" }}
            >
              <span
                className="text-xs text-gray-400"
              >
                {p.images?.length ?? 0} images
              </span>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-purple-50 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                </button>

                <button onClick={()=>{
                  console.log('button is clicked')
                  router.push(`/seller/product/${p.id}`)
                }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-purple-50 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-purple-600" />
                </button>

                <button 
                onClick={()=>{
                  try {
                    dispatch(deleteProductbyId(p.id));
                    toast.success(message)
                  } catch (err) {
                    toast.error(error)
                  }}}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {showModal && (
      <AddProductModal
        onClose={() => setShowModal(false)}
      />
    )}
  </div>
)
}