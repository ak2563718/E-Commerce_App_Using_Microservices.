'use client'
import { getAllCategories } from '@/redux/category/category.Action'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProductbyId, updateProductbyId } from '@/redux/product/product.Action'
import { deleteProductImage, updateProudctImage, uploadProductImage } from '@/redux/product/product.Type.Action'
import { updateVariants } from '@/redux/productvariants/variants.Action'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import UpdateProductLoader from '../skeleton&Loader/UpdateProductLoader'

interface ProductData {
  name: string;
  sku: string;
  category: string;
  subCategory: string;
  description: string;
  price: string;
  stock: string;
  brand:string;
  costPrice:string;
  color:string;
  size:string;
  barcode:string;
  weight:string;
  seoTitle:string;
  seoDescription:string;
  length:string;
  width:string;
  height:string,
  taxPercentage:string,
}

type CategoryOption = {
  id: string
  name: string
  parentId?: string | null
  children?: CategoryOption[]
}

type ProductImageData = {
  url: string
}

type ProductVariantData = {
  id?: string
  sku?: string
  price?: string | number
  stock?: string | number
  costPrice?: string |number
  color?:string
  size?:string
  barcode?:string
  weight?:string
}

// ─── icons ───────────────────────────────────────────────────────────────────

function PencilIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function TrashIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function UploadIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  )
}

function ChevronIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ─── theme tokens ─────────────────────────────────────────────────────────────

const t = {
  pageBg: 'linear-gradient(135deg, #0f0220 0%, #1a0533 50%, #0d021a 100%)',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  cardBorderHover: 'rgba(168,85,247,0.4)',
  inputBg: 'rgba(255,255,255,0.05)',
  inputBorder: 'rgba(255,255,255,0.1)',
  inputBorderFocus: '#7c3aed',
  readonlyBg: 'rgba(255,255,255,0.03)',
  readonlyBorder: 'rgba(255,255,255,0.07)',
  textPrimary: 'rgba(255,255,255,0.92)',
  textSecondary: 'rgba(255,255,255,0.55)',
  textMuted: 'rgba(255,255,255,0.3)',
  accent: '#7c3aed',
  accentLight: '#a855f7',
  accentPink: '#e91e8c',
  accentGlow: 'rgba(124,58,237,0.2)',
  successBg: 'rgba(16,185,129,0.12)',
  successBorder: 'rgba(16,185,129,0.25)',
  successText: '#34d399',
  dangerBg: 'rgba(239,68,68,0.15)',
  dangerBorder: 'rgba(239,68,68,0.3)',
  dangerText: '#f87171',
}

// ─── image card ───────────────────────────────────────────────────────────────

function ImageCard({
  src, index, isMain, editMode, onSetMain, onRemove, onReplace,
}: {
  src: string; index: number; isMain: boolean; editMode: boolean
  onSetMain: () => void; onRemove: () => void; onReplace: (f: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      onClick={() => !editMode && onSetMain()}
      className="relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        aspectRatio: '1/1',
        border: `2px solid ${isMain ? '#a855f7' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: isMain ? '0 0 0 3px rgba(168,85,247,0.2)' : 'none',
        background: 'rgba(255,255,255,0.04)',
      }}
    >
      <img src={src} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />

      {isMain && (
        <span
          className="absolute top-2 left-2 text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
          style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }}
        >
          Main
        </span>
      )}

      {editMode && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 flex-col"
          style={{ background: 'rgba(10,2,20,0.75)' }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all"
            style={{ background: 'rgba(124,58,237,0.9)', color: '#fff', border: '1px solid rgba(168,85,247,0.5)' }}
          >
            <UploadIcon size={11} /> Replace
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove() }}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all"
            style={{ background: t.dangerBg, color: t.dangerText, border: `1px solid ${t.dangerBorder}` }}
          >
            <TrashIcon size={11} /> Remove
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onReplace(f) }} />
        </div>
      )}
    </div>
  )
}

function AddImageSlot({ onAdd }: { onAdd: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="relative rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 group"
      style={{
        aspectRatio: '1/1',
        border: '2px dashed rgba(124,58,237,0.35)',
        background: 'rgba(124,58,237,0.05)',
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
        style={{ background: 'rgba(124,58,237,0.2)', color: '#a855f7' }}
      >
        <PlusIcon size={16} />
      </div>
      <span className="text-xs font-medium" style={{ color: 'rgba(168,85,247,0.7)' }}>Add image</span>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onAdd(f) }} />
    </div>
  )
}

// ─── section header ───────────────────────────────────────────────────────────

function SectionHeader({
  title, subtitle, editMode, saving, onEdit, onSave, onCancel,
}: {
  title: string; subtitle: string; editMode: boolean; saving?: boolean
  onEdit: () => void; onSave: () => void; onCancel: () => void
}) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-sm font-bold" style={{ color: t.textPrimary }}>{title}</h2>
        <p className="text-xs mt-0.5" style={{ color: t.textMuted }}>{subtitle}</p>
      </div>
      {!editMode ? (
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all"
          style={{
            color: '#a855f7',
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.25)',
          }}
        >
          <PencilIcon /> Edit
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all"
            style={{ color: t.textSecondary, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <XIcon /> Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 text-xs font-bold rounded-lg px-3 py-1.5 transition-all disabled:opacity-60"
            style={{ color: '#fff', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', border: '1px solid rgba(168,85,247,0.4)' }}
          >
            {saving ? (
              <>
                <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving…
              </>
            ) : (
              <><CheckIcon /> Save changes</>
            )}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── field components ─────────────────────────────────────────────────────────

function ReadonlyField({ label, value, mono, prefix }: { label: string; value: string; mono?: boolean; prefix?: string }) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>
        {label}
      </label>
      <div
        className={`w-full rounded-lg px-3.5 py-2.5 text-sm min-h-[42px] ${mono ? 'font-mono text-xs tracking-wide' : ''}`}
        style={{ background: t.readonlyBg, border: `1px solid ${t.readonlyBorder}`, color: value ? t.textPrimary : t.textMuted }}
      >
        {value ? `${prefix ?? ''}${value}` : <span style={{ color: t.textMuted, fontStyle: 'italic' }}>—</span>}
      </div>
    </div>
  )
}

function EditField({
  label, value, onChange, type = 'text', placeholder, mono, prefix,
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string; mono?: boolean; prefix?: string
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: t.textSecondary }}>{prefix}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg py-2.5 text-sm outline-none transition-all placeholder:opacity-25 ${mono ? 'font-mono text-xs tracking-wide' : ''}`}
          style={{
            background: t.inputBg,
            border: `1px solid ${t.inputBorder}`,
            color: t.textPrimary,
            paddingLeft: prefix ? '2rem' : '0.875rem',
            paddingRight: '0.875rem',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = t.inputBorderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accentGlow}` }}
          onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.boxShadow = 'none' }}
        />
      </div>
    </div>
  )
}

function EditTextarea({ label, value, onChange, placeholder, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all placeholder:opacity-25 resize-none"
        style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.textPrimary }}
        onFocus={(e) => { e.currentTarget.style.borderColor = t.inputBorderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accentGlow}` }}
        onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.boxShadow = 'none' }}
      />
    </div>
  )
}

function EditSelect({ label, value, onChange, options, optional }: {
  label: string; value: string; onChange: (v: string) => void; options: CategoryOption[]; optional?: boolean
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>
        {label} {optional && <span className="normal-case font-normal" style={{ color: t.textMuted, opacity: 0.6 }}>(optional)</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all"
          style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.textPrimary }}
          onFocus={(e) => { e.currentTarget.style.borderColor = t.inputBorderFocus; e.currentTarget.style.boxShadow = `0 0 0 3px ${t.accentGlow}` }}
          onBlur={(e) => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.boxShadow = 'none' }}
        >
          {optional && <option value="">None</option>}
          {options.map((o) => <option key={o.id} value={o.name} style={{ background: '#1a0533' }}>{o?.name}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }}>
          <ChevronIcon />
        </span>
      </div>
    </div>
  )
}

// ─── toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold"
      style={{
        background: type === 'success' ? 'linear-gradient(90deg, #1a0533, #2d0a5e)' : t.dangerBg,
        border: `1px solid ${type === 'success' ? 'rgba(168,85,247,0.4)' : t.dangerBorder}`,
        color: type === 'success' ? '#fff' : t.dangerText,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        animation: 'fadeSlideUp 0.3s ease-out',
      }}
    >
      {type === 'success' ? <CheckIcon size={15} /> : <XIcon size={15} />}
      {message}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function UpdateProduct() {
  const [images, setImages] = useState<any[]>([])
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [imageEditMode, setImageEditMode] = useState(false)
  const [imageSaving, setImageSaving] = useState(false)
  const [pendingImages, setPendingImages] = useState<string[]>([])
  const [pendingMain, setPendingMain] = useState(0)
  const [pendingImageFiles, setPendingImageFiles] = useState<Record<string, File>>({})
  const [detailEditMode, setDetailEditMode] = useState(false)
  const [detailSaving, setDetailSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector((state)=>state.category)


  const params = useParams<{ id: string }>();
  const productId = params.id
  const [product, setProduct] = useState<ProductData>({
    name: '',
    sku: '',
    category: '',
    subCategory: '',
    description: '',
    price: '',
    stock: '',
    brand:'',
    costPrice:'',
    color:'',
    size:'',
    barcode:'',
    weight:'',
    seoTitle:'',
    seoDescription:'',
    length:'',
    width:'',
    height:'',
    taxPercentage:'',
  })
  const [categoryId, setCategoryId] = useState('')
  const [brand, setBrand] = useState<any[]>([])
  const [brandId, setBrandId] = useState('')
  const [variantId, setVariantId] = useState('')
  const [refresh, setRefresh]= useState<boolean>(false)
   useEffect(()=>{
    const getProduct =async()=>{
      if(productId){
        const res = await dispatch(getProductbyId(productId)).unwrap();
        const variant = res.data?.variants?.[0] as ProductVariantData | undefined
        setProduct({
            name: res.data?.name ?? '',
            sku: res.data?.sku ?? '',
            category: res.data?.category?.parent?.name ?? res.data?.category?.name ?? '',
            subCategory: res.data?.category?.parent ? res.data?.category?.name : '',
            description: res.data?.description ?? '',
            price: String(variant?.price ?? ''),
            stock: String(variant?.stock ?? ''),
            brand:res.data?.brand?.name,
            costPrice:String(variant?.costPrice),
            color:variant?.color ?? "",
            size:variant?.size ?? '',
            barcode:variant?.barcode ?? '',
            weight:res.data?.weight ?? '',
            seoTitle:res.data?.seoTitle?? '',
            seoDescription:res.data?.seoDescription?? '',
            length:res.data?.length?? '',
            width:res.data?.width?? '',
            height:res.data?.height??'',
            taxPercentage:res.data?.taxPercentage??'',
        })
        setCategoryId(res.data?.category?.id ?? '')
        setVariantId(variant?.id ?? '')
        const image = (res.data?.images as ProductImageData[] | undefined)?? [];
        setImages(image)
        setLoading(false)
      } 
    }
    getProduct()
  },[dispatch, productId, refresh])

  useEffect(()=>{
    dispatch(getAllCategories())
  },[dispatch])

  const [draft, setDraft] = useState<ProductData>(product)
  const parentCategories = (categories?.filter((c)=>c.parentId === null) ?? []) as CategoryOption[]
  const selectedCategory = parentCategories.find((c) => c.name === draft.category)
  const subCategories = selectedCategory?.children?.length
    ? selectedCategory.children
    : ((categories?.filter((c)=>c.parentId === selectedCategory?.id) ?? []) as CategoryOption[])

  const handleCategoryChange = (name: string) => {
    const category = parentCategories.find((c) => c.name === name)
    setDraft({ ...draft, category: name, subCategory: '' })
    setCategoryId(category?.id ?? '')
  }

  const handleSubCategoryChange = (name: string) => {
    const subCategory = subCategories.find((c) => c.name === name)
    setDraft({ ...draft, subCategory: name })
    setCategoryId(subCategory?.id ?? selectedCategory?.id ?? '')
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
  const getBrand = async () => {
    try {
      const res = await axios.get('http://localhost:6002/api/brands', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setBrand(res.data?.data)
    } catch (error) {
      console.error(error);
    }
  };
    getBrand();
  }, []);

  const handleBrandChange=(name:string)=>{
     const extract = brand.find((b)=>b.name === name);
     setDraft({...draft,brand:name})
     setBrandId(extract.id)
  }

  const handleImageEditStart = () => { setPendingImages([...images]); setPendingMain(mainImageIndex); setPendingImageFiles({}); setImageEditMode(true) }
  const handleImageEditCancel = () => { setImageEditMode(false); setPendingImages([]); setPendingImageFiles({}) }
  const handleImageSave = async () => {
    try {
      setImageSaving(true)
      const files = Object.values(pendingImageFiles)

      if (files.length > 0) {
        const formData = new FormData()
        files.forEach((file) => formData.append('images', file))
        const res = await dispatch(uploadProductImage({ id: productId, formData })).unwrap()
        const updatedImages = (res.data as ProductImageData[] | undefined) ?? pendingImages
        setImages(updatedImages)
      } else {
        setImages(pendingImages)
      }

      setMainImageIndex(pendingMain)
      setImageEditMode(false)
      setPendingImageFiles({})
      showToast('Images updated successfully', 'success')
    } catch (error) {
      showToast(typeof error === 'string' ? error : 'Image update failed', 'error')
    } finally {
      setImageSaving(false)
    }
  }

  const activeImages = imageEditMode ? pendingImages : images
  const activeMain = imageEditMode ? pendingMain : mainImageIndex

  const handleAddImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setPendingImageFiles((prev) => ({ ...prev, [url]: file }))
    setPendingImages((p) => [...p, url])
  }
  const handleRemoveImage = async(imgId:string) => {
    setPendingImages((prev)=>prev.filter((c:any)=>c.id !== imgId))
    const res = await dispatch(deleteProductImage(imgId)).unwrap();
    setRefresh(true)
  }
  const handleReplaceImage = async(imgId:string, file: File) => {
    const formData = new FormData();
    formData.append('newimage',file)
    const res = await dispatch(updateProudctImage({id:imgId, formData})).unwrap();
    setPendingImages((prev)=> prev?.map((i:any)=>i.id === imgId ?
      res.data : i))
  }

  const handleDetailEditStart = () => { setDraft({ ...product }); setDetailEditMode(true) }
  const handleDetailEditCancel = () => { setDetailEditMode(false); setDraft(product) }
  const handleDetailSave = async () => {
    try {
      setDetailSaving(true)

      const productRes = await dispatch(updateProductbyId({
        id: productId,
        form: {
          name: draft.name,
          sku: draft.sku,
          description: draft.description,
          categoryId,
          brandId,
          seoTitle:draft.seoTitle,
          seoDescription:draft.seoDescription,
          weight:draft.weight,
          length:draft.length,
          width:draft.width,
          height:draft.height,
          taxPercentage:draft.taxPercentage
        },
      })).unwrap()

      if (variantId) {
        await dispatch(updateVariants({
          id: variantId,
          form: {
            sku: draft.sku,
            price: draft.price,
            stock: draft.stock,
            costPrice:draft.costPrice,
            color:draft.color,
            size:draft.size,
            barcode:draft.barcode,
            weight:draft.weight,
          },
        })).unwrap()
      }

      const refreshed = await dispatch(getProductbyId(productId)).unwrap()
      const variant = refreshed.data?.variants?.[0] as ProductVariantData | undefined
      setProduct({
        name: refreshed.data?.name ?? draft.name,
        sku: refreshed.data?.sku ?? draft.sku,
        category: refreshed.data?.category?.parent?.name ?? refreshed.data?.category?.name ?? draft.category,
        subCategory: refreshed.data?.category?.parent ? refreshed.data?.category?.name : '',
        description: refreshed.data?.description ?? draft.description,
        price: String(variant?.price ?? draft.price),
        stock: String(variant?.stock ?? draft.stock),
        brand:refreshed.data?.brand?.name,
        costPrice:String(variant?.costPrice),
        color:variant?.color ?? draft.color,
        size:variant?.size ?? draft.size,
        barcode:variant?.barcode ?? draft.barcode,
        weight:variant?.weight ?? draft.barcode,
        seoTitle:refreshed.data?.seoTitle ?? draft.seoTitle,
        seoDescription:refreshed.data?.seoDescription ?? draft.seoDescription,
        length:refreshed.data?.length ?? draft.length,
        width:refreshed.data?.width ?? draft.width,
        height:refreshed.data?.height ?? draft.height,
        taxPercentage:refreshed.data?.taxPercentage ?? draft.taxPercentage,   
      })
      setCategoryId(refreshed.data?.category?.id ?? categoryId)
      setVariantId(variant?.id ?? variantId)
      setDetailEditMode(false)
      showToast(productRes.message ?? 'Product details saved', 'success')
    } catch (error) {
      showToast(typeof error === 'string' ? error : 'Product update failed', 'error')
    } finally {
      setDetailSaving(false)
    }
  }

  if(loading){
    return (
      <UpdateProductLoader/>
    )
  }

  return (
    <div className="min-h-full overflow-y-auto"
    style={{
      background: t.pageBg,
      fontFamily: "'Outfit', sans-serif",
    }}>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">

        {/* breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: t.textMuted }}>
          <span style={{ color: t.textSecondary }}>Products</span>
          <ChevronIcon size={10} />
          <span style={{ color: '#a855f7' }}>{product.name}</span>
        </div>

        {/* page header */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl font-bold leading-tight truncate" style={{ color: t.textPrimary }}>
                {product.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                <span
                  className="font-mono text-[11px] tracking-widest px-2.5 py-1 rounded-md"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', color: '#a855f7' }}
                >
                  {product.sku}
                </span>
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: t.successBg, border: `1px solid ${t.successBorder}`, color: t.successText }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  In Stock
                </span>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${t.cardBorder}`, color: t.textSecondary }}
                >
                  {product.category}{product.subCategory ? ` · ${product.subCategory}` : ''}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div
                className="text-2xl font-black"
                style={{ background: 'linear-gradient(90deg, #a855f7, #e91e8c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                ₹{Number(product.price).toLocaleString('en-IN')}
              </div>
              <div className="text-xs mt-1" style={{ color: t.textMuted }}>{product.stock} units available</div>
            </div>
          </div>
        </div>

        {/* images section */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: t.cardBg, border: `1px solid ${imageEditMode ? 'rgba(124,58,237,0.3)' : t.cardBorder}`, transition: 'border-color 0.2s' }}
        >
          <SectionHeader
            title="Product Images"
            subtitle={
              imageEditMode
                ? `Editing · ${activeImages.length}/5 images · hover to replace or remove`
                : `${images.length} image${images.length !== 1 ? 's' : ''} · click to set as main`
            }
            editMode={imageEditMode}
            saving={imageSaving}
            onEdit={handleImageEditStart}
            onSave={handleImageSave}
            onCancel={handleImageEditCancel}
          />

          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
            {activeImages.map((img, i) => (
              <ImageCard
                key={img?.id}
                src={img?.url}
                index={i}
                isMain={i === activeMain}
                editMode={imageEditMode}
                onSetMain={() => imageEditMode ? setPendingMain(i) : setMainImageIndex(i)}
                onRemove={() => handleRemoveImage(img?.id)}
                onReplace={(f) => handleReplaceImage(img?.id, f)}
              />
            ))}
            {imageEditMode && activeImages.length < 5 && <AddImageSlot onAdd={handleAddImage} />}
          </div>
        </div>

        {/* details section */}
        <div
          className="rounded-2xl p-5"
          style={{ background: t.cardBg, border: `1px solid ${detailEditMode ? 'rgba(124,58,237,0.3)' : t.cardBorder}`, transition: 'border-color 0.2s' }}
        >
          <SectionHeader
            title="Product Details"
            subtitle={detailEditMode ? 'Edit the fields below then save to update' : 'Name, pricing, inventory, and categorization'}
            editMode={detailEditMode}
            saving={detailSaving}
            onEdit={handleDetailEditStart}
            onSave={handleDetailSave}
            onCancel={handleDetailEditCancel}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              {detailEditMode
                ? <EditField label="Product Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} placeholder="Enter product name" />
                : <ReadonlyField label="Product Name" value={product.name} />}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="SKU" value={draft.sku} onChange={(v) => setDraft({ ...draft, sku: v })} placeholder="e.g. SKU-001" mono />
                : <ReadonlyField label="SKU" value={product.sku} mono />}
            </div>

            <div>
              {detailEditMode
                ? <EditSelect label="Category" value={draft.category} onChange={handleCategoryChange} options={parentCategories} />
                : <ReadonlyField label="Category" value={product.category} />}
            </div>

            <div>
              {detailEditMode
                ? <EditSelect label="Brand" value={draft.brand} onChange={handleBrandChange} options={brand} optional />
                : <ReadonlyField label="Brand" value={product.brand} />}
            </div>

            <div>
              {detailEditMode
                ? <EditSelect label="Sub-Category" value={draft.subCategory} onChange={handleSubCategoryChange} options={subCategories} />
                : <ReadonlyField label="Sub-Category" value={product.subCategory} />}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="Price (₹)" value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })} type="number" placeholder="0" prefix="₹" />
                : <ReadonlyField label="Price" value={`₹${Number(product.price).toLocaleString('en-IN')}`} />}
            </div>
            <div>
              {detailEditMode
                ? <EditField label="Cost-Price (₹)" value={draft.costPrice} onChange={(v) => setDraft({ ...draft, costPrice: v })} type="number" placeholder="0" prefix="₹" />
                : <ReadonlyField label="Cost-Price" value={`₹${Number(product.costPrice).toLocaleString('en-IN')}`} />}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="Stock Quantity" value={draft.stock} onChange={(v) => setDraft({ ...draft, stock: v })} type="number" placeholder="0" />
                : <ReadonlyField label="Stock Quantity" value={`${product.stock} units`} />}
            </div>

             <div>
              {detailEditMode
                ? <EditField label="Barcode" value={draft.barcode} onChange={(v) => setDraft({ ...draft, barcode: v })} type="text" placeholder="string" />
                : <ReadonlyField label="Barcode" value={`${product.barcode} `} />}
            </div>

            <div className="sm:col-span-2">
              {detailEditMode
                ? <EditTextarea label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} placeholder="Describe the product..." rows={5} />
                : (
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>Description</label>
                    <div className="rounded-lg px-3.5 py-2.5 text-sm leading-relaxed" style={{ background: t.readonlyBg, border: `1px solid ${t.readonlyBorder}`, color: product.description ? t.textPrimary : t.textMuted }}>
                      {product.description || <span style={{ fontStyle: 'italic' }}>—</span>}
                    </div>
                  </div>
                )}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="Seo-Title" value={draft.seoTitle} onChange={(v) => setDraft({ ...draft, seoTitle: v })} type="text" placeholder="seo-title" />
                : <ReadonlyField label="Seo-Title" value={`${product.seoTitle} `} />}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="Tax-Percentage" value={draft.taxPercentage} onChange={(v) => setDraft({ ...draft, taxPercentage: v })} type="number" placeholder="tax-percentage" />
                : <ReadonlyField label="Tax-Percentage" value={`${product.taxPercentage} `} />}
            </div>

            <div className="sm:col-span-2">
              {detailEditMode
                ? <EditTextarea label="Seo-Description" value={draft.seoDescription} onChange={(v) => setDraft({ ...draft, seoDescription: v })} placeholder="Describe the product seo..." rows={5} />
                : (
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase mb-1.5" style={{ color: t.textMuted }}>Seo-Description</label>
                    <div className="rounded-lg px-3.5 py-2.5 text-sm leading-relaxed" style={{ background: t.readonlyBg, border: `1px solid ${t.readonlyBorder}`, color: product.seoDescription ? t.textPrimary : t.textMuted }}>
                      {product.seoDescription || <span style={{ fontStyle: 'italic' }}>—</span>}
                    </div>
                  </div>
                )}
            </div>

             <div>
              {detailEditMode
                ? <EditField label="Size" value={draft.size} onChange={(v) => setDraft({ ...draft, size: v })} type="number" placeholder="string" />
                : <ReadonlyField label="Size" value={`${product.size} `} />}
            </div>

            <div>
              {detailEditMode
                ? <EditField label="Weight" value={draft.weight} onChange={(v) => setDraft({ ...draft, weight: v })} type="text" placeholder="string" />
                : <ReadonlyField label="Weight" value={`${product.weight} gm`} />}
            </div>    

             <div>
              {detailEditMode
                ? <EditField label="Color" value={draft.color} onChange={(v) => setDraft({ ...draft, color: v })} type="text" placeholder="RED-BLUE" />
                : <ReadonlyField label="Color" value={`${product.color} `} />}
            </div>    

             <div>
              {detailEditMode
                ? <EditField label="Length" value={draft.length} onChange={(v) => setDraft({ ...draft, length: v })} type="text" placeholder="Inches.." />
                : <ReadonlyField label="Length" value={`${product.length} `} />}
            </div>   

             <div>
              {detailEditMode
                ? <EditField label="Width" value={draft.width} onChange={(v) => setDraft({ ...draft, width: v })} type="text" placeholder="in cm.." />
                : <ReadonlyField label="Width" value={`${product.width} `} />}
            </div>  

             <div>
              {detailEditMode
                ? <EditField label="Height" value={draft.height} onChange={(v) => setDraft({ ...draft, height: v })} type="text" placeholder="in cm.." />
                : <ReadonlyField label="Height" value={`${product.height} `} />}
            </div>    

             {/* <button onClick={()=>router.push('/seller/dashboard')} className='relative text-white left-150 border border-white w-20 p-1 rounded-lg'>Cancel</button> */}
          </div>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: 'rgba(255,255,255,0.12)' }}>
          Images and product details are saved via separate API calls
        </p>
      </div>

       <style>{`
      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
        opacity: 0.3;
      }

      option {
        background: #1a0533;
        color: #fff;
      }
    `}</style>
      
    </div>
  )
}
