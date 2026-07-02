/**
 * Admin Media Library — Rapbae CMS
 * Upload, browse, copy URL, and delete media files.
 */
import AdminLayout from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";
import { Copy, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AdminMedia() {
  const utils = trpc.useUtils();
  const { data: mediaList, isLoading } = trpc.media.list.useQuery({});

  const uploadMutation = trpc.media.upload.useMutation({
    onSuccess: () => { utils.media.list.invalidate(); toast.success("업로드 완료"); },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => { utils.media.list.invalidate(); toast.success("삭제됐습니다."); },
    onError: (e) => toast.error(e.message),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onload = async () => {
          const base64 = (reader.result as string).split(",")[1];
          await uploadMutation.mutateAsync({
            filename: file.name,
            mimeType: file.type,
            data: base64,
            fileSize: file.size,
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => toast.success("URL이 복사됐습니다."));
  };

  const handleDelete = (id: number) => {
    if (deleteConfirm === id) {
      deleteMutation.mutate({ id });
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <AdminLayout title="미디어 라이브러리">
      <div style={{ maxWidth: 960 }}>
        {/* Header + Upload */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.3rem", color: "#111", fontWeight: 400 }}>미디어 라이브러리</h2>
            <p style={{ color: "#999", fontSize: "0.82rem", marginTop: 4 }}>{mediaList?.length ?? 0}개 파일</p>
          </div>
          <div>
            <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,.pdf" onChange={handleFileChange} style={{ display: "none" }} />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px", backgroundColor: "#111", color: "#fff", fontSize: "0.82rem", cursor: "pointer", border: "none", opacity: uploading ? 0.6 : 1 }}
            >
              <Upload size={14} />
              {uploading ? "업로드 중..." : "파일 업로드"}
            </button>
          </div>
        </div>

        {/* Upload hint */}
        <div
          style={{ border: "2px dashed #e5e5e5", padding: "24px", textAlign: "center", marginBottom: 24, cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={24} color="#ccc" style={{ margin: "0 auto 8px" }} />
          <p style={{ color: "#bbb", fontSize: "0.85rem" }}>클릭하거나 파일을 드래그하여 업로드</p>
          <p style={{ color: "#ddd", fontSize: "0.75rem", marginTop: 4 }}>이미지, PDF 지원 · 최대 16MB</p>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <p style={{ color: "#bbb", textAlign: "center", padding: 40 }}>로딩 중...</p>
        ) : !mediaList || mediaList.length === 0 ? (
          <div style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", padding: "60px 40px", textAlign: "center" }}>
            <p style={{ color: "#bbb", fontSize: "0.9rem" }}>아직 업로드된 파일이 없습니다.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {mediaList.map((media) => (
              <div key={media.id} style={{ backgroundColor: "#fff", border: "1px solid #ebebeb", overflow: "hidden" }}>
                {/* Preview */}
                <div style={{ aspectRatio: "4/3", backgroundColor: "#f7f5f2", overflow: "hidden", position: "relative" }}>
                  {media.mimeType?.startsWith("image/") ? (
                    <img src={media.url} alt={media.filename} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.7rem", color: "#bbb", textTransform: "uppercase" }}>{media.mimeType?.split("/")[1] || "file"}</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ fontSize: "0.75rem", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{media.filename}</p>
                  {media.fileSize && <p style={{ fontSize: "0.68rem", color: "#bbb", marginBottom: 8 }}>{formatSize(media.fileSize)}</p>}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => copyUrl(media.url)}
                      title="URL 복사"
                      style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px", border: "1px solid #e5e5e5", background: "none", cursor: "pointer", fontSize: "0.72rem", color: "#555" }}
                    >
                      <Copy size={11} /> URL 복사
                    </button>
                    <button
                      onClick={() => handleDelete(media.id)}
                      title={deleteConfirm === media.id ? "한 번 더 클릭하면 삭제됩니다" : "삭제"}
                      style={{ padding: "6px 8px", border: `1px solid ${deleteConfirm === media.id ? "#ef4444" : "#e5e5e5"}`, background: "none", cursor: "pointer" }}
                    >
                      <Trash2 size={12} color={deleteConfirm === media.id ? "#ef4444" : "#bbb"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
