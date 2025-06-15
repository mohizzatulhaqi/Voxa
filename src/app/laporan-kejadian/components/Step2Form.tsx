//src/app/laporan-kejadian/components/Step2Form.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Upload,
  File,
  X,
  Play,
  Pause,
  Video,
  Image as ImageIcon,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Step2FormProps {
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video";
  id: string;
}

export function Step2Form({ onSubmit, onBack }: Step2FormProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleMediaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => handleMediaFile(file));
  };

  const handleMediaFile = (file: File) => {
    // Check if we already have 4 files
    if (mediaFiles.length >= 4) {
      alert("Maksimum 4 file foto/video");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Mohon pilih file foto (.jpg, .png) atau video (.mp4, .mov)");
      return;
    }

    // Validate file size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran file maksimum 3MB");
      return;
    }

    const mediaType = file.type.startsWith("image/") ? "image" : "video";
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const newMediaFile: MediaFile = {
        file: file,
        preview: e.target?.result as string,
        type: mediaType,
        id: id,
      };
      setMediaFiles((prev) => [...prev, newMediaFile]);
    };
    reader.readAsDataURL(file);
  };

  const handleAudioFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("audio/")) {
      alert("Mohon pilih file audio (.mp3, .wav)");
      return;
    }

    // Validate file size (3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran file maksimum 3MB");
      return;
    }

    setAudioFile(file);
  };

  const openMediaModal = (media: MediaFile) => {
    const index = mediaFiles.findIndex((m) => m.id === media.id);
    setCurrentModalIndex(index);
    setSelectedMedia(media);
  };

  const closeMediaModal = () => {
    setSelectedMedia(null);
    setCurrentModalIndex(0);
  };

  const navigateModal = (direction: "prev" | "next") => {
    let newIndex = currentModalIndex;

    if (direction === "prev") {
      newIndex =
        currentModalIndex > 0 ? currentModalIndex - 1 : mediaFiles.length - 1;
    } else {
      newIndex =
        currentModalIndex < mediaFiles.length - 1 ? currentModalIndex + 1 : 0;
    }

    setCurrentModalIndex(newIndex);
    setSelectedMedia(mediaFiles[newIndex]);
  };

  const removeMedia = (id: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== id));
  };

  const removeAudio = () => {
    setAudioFile(null);
    setIsPlaying(false);
    if (audioInputRef.current) {
      audioInputRef.current.value = "";
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderMediaPreview = () => {
    const count = mediaFiles.length;

    if (count === 0) return null;

    if (count === 1) {
      // 1 file: Full width, larger height
      const media = mediaFiles[0];
      return (
        <div className="relative w-full h-80 group">
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => openMediaModal(media)}
          >
            {media.type === "image" ? (
              <img
                src={media.preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <video
                src={media.preview}
                className="w-full h-full object-cover rounded-md"
                controls
                onClick={(e) => e.stopPropagation()}
              />
            )}
            {media.type === "image" && (
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                <ZoomIn className="h-10 w-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              removeMedia(media.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
            {media.type === "image" ? (
              <ImageIcon className="h-3 w-3 mr-1" />
            ) : (
              <Video className="h-3 w-3 mr-1" />
            )}
            {media.type}
          </div>
        </div>
      );
    }

    if (count === 2) {
      // 2 files: Grid 2 columns, larger height
      return (
        <div className="grid grid-cols-2 gap-3">
          {mediaFiles.map((media) => (
            <div key={media.id} className="relative h-40 group">
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => openMediaModal(media)}
              >
                {media.type === "image" ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-full object-cover rounded-md"
                    controls
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {media.type === "image" && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 p-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMedia(media.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                {media.type === "image" ? (
                  <ImageIcon className="h-3 w-3 mr-1" />
                ) : (
                  <Video className="h-3 w-3 mr-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (count === 3) {
      // 3 files: 1 top (larger), 2 bottom
      return (
        <div className="space-y-3">
          {/* First image full width, larger */}
          <div className="relative h-40 group">
            <div
              className="relative w-full h-full cursor-pointer"
              onClick={() => openMediaModal(mediaFiles[0])}
            >
              {mediaFiles[0].type === "image" ? (
                <img
                  src={mediaFiles[0].preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <video
                  src={mediaFiles[0].preview}
                  className="w-full h-full object-cover rounded-md"
                  controls
                  onClick={(e) => e.stopPropagation()}
                />
              )}
              {mediaFiles[0].type === "image" && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 p-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                removeMedia(mediaFiles[0].id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
              {mediaFiles[0].type === "image" ? (
                <ImageIcon className="h-3 w-3 mr-1" />
              ) : (
                <Video className="h-3 w-3 mr-1" />
              )}
            </div>
          </div>

          {/* Bottom 2 images */}
          <div className="grid grid-cols-2 gap-3">
            {mediaFiles.slice(1, 3).map((media) => (
              <div key={media.id} className="relative h-32 group">
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={() => openMediaModal(media)}
                >
                  {media.type === "image" ? (
                    <img
                      src={media.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <video
                      src={media.preview}
                      className="w-full h-full object-cover rounded-md"
                      controls
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                  {media.type === "image" && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia(media.id);
                  }}
                >
                  <Trash2 className="h-2 w-2" />
                </Button>
                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                  {media.type === "image" ? (
                    <ImageIcon className="h-3 w-3 mr-1" />
                  ) : (
                    <Video className="h-3 w-3 mr-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (count === 4) {
      // 4 files: 2x2 grid, larger
      return (
        <div className="grid grid-cols-2 gap-3">
          {mediaFiles.map((media) => (
            <div key={media.id} className="relative h-32 group">
              <div
                className="relative w-full h-full cursor-pointer"
                onClick={() => openMediaModal(media)}
              >
                {media.type === "image" ? (
                  <img
                    src={media.preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-full object-cover rounded-md"
                    controls
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                {media.type === "image" && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                    <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-red-500 p-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMedia(media.id);
                }}
              >
                <Trash2 className="h-2 w-2" />
              </Button>
              <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center">
                {media.type === "image" ? (
                  <ImageIcon className="h-3 w-3 mr-1" />
                ) : (
                  <Video className="h-3 w-3 mr-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mediaFiles.length === 0) {
      alert("Minimal 1 bukti foto/video wajib diupload");
      return;
    }

    // Call parent onSubmit with form data
    onSubmit(e);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Media Upload Section */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium text-base">
              Bukti Foto / Video <span className="text-red-500">*</span>
            </Label>

            {mediaFiles.length === 0 ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-white transition-colors min-h-[320px] ${
                  dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
                }`}
                onDrop={handleMediaDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-center mb-4 text-base">
                  Seret dan lepas foto/video kesini atau
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-11 px-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Dari Komputer
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    files.forEach((file) => handleMediaFile(file));
                  }}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="border border-gray-300 rounded-lg p-4 bg-white min-h-[320px]">
                {renderMediaPreview()}

                {/* Add more button if less than 4 files */}
                {mediaFiles.length < 4 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-10"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Tambah Foto/Video ({mediaFiles.length}/4)
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach((file) => handleMediaFile(file));
                      }}
                      className="hidden"
                    />
                  </div>
                )}

                {/* File list */}
                <div className="mt-4 space-y-2">
                  {mediaFiles.map((media) => (
                    <div
                      key={media.id}
                      className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        {media.type === "image" ? (
                          <ImageIcon className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Video className="h-4 w-4 text-purple-500" />
                        )}
                        <span className="truncate max-w-[200px]">
                          {media.file.name}
                        </span>
                      </div>
                      <span className="text-gray-400">
                        {formatFileSize(media.file.size)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm text-gray-500">
              Maksimum 4 file, ukuran maksimum 3MB per file. Format: .png .jpg
              .mp4 .mov
            </p>
          </div>

          {/* Audio Upload Section */}
          <div className="space-y-3">
            <Label className="text-gray-700 font-medium text-base">
              Bukti Suara (Opsional)
            </Label>

            <div className="border border-gray-300 rounded-lg p-6 bg-white min-h-[320px] flex flex-col">
              {!audioFile ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-base mb-4">
                      Upload file audio
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-11 px-6"
                    onClick={() => audioInputRef.current?.click()}
                  >
                    Pilih Audio
                  </Button>

                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioFile(file);
                    }}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col group">
                  {/* Audio File Header with Trash Button */}
                  <div className="relative flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <File className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700 truncate block max-w-[200px]">
                          {audioFile.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(audioFile.size)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Trash Button - Similar to media files */}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-red-500 hover:bg-red-600 text-white border-red-500 p-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={removeAudio}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Audio Player Controls */}
                  <div className="flex-1 flex items-center justify-center">
                    <Button
                      type="button"
                      variant="outline"
                      className="bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100 h-12 w-12 rounded-full p-0"
                      onClick={toggleAudio}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5 ml-0.5" />
                      )}
                    </Button>
                  </div>

                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  >
                    <source src={URL.createObjectURL(audioFile)} />
                  </audio>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500">
              Ukuran maksimum audio 3MB dengan format .mp3 .wav
            </p>
          </div>
        </div>

        {/* Enhanced Modal for Full Image/Video View with Navigation */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <div className="relative w-full h-full flex items-center justify-center px-20">
              {/* Close Button - Top Right Corner */}
              <Button
                type="button"
                variant="outline"
                className="fixed top-4 right-4 bg-white/90 hover:bg-white z-20 h-10 w-10 p-0"
                onClick={closeMediaModal}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation Arrows - Outside the image area */}
              {mediaFiles.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-20 h-12 w-12 p-0 rounded-full"
                    onClick={() => navigateModal("prev")}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white z-20 h-12 w-12 p-0 rounded-full"
                    onClick={() => navigateModal("next")}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Media Content */}
              <div className="w-full h-full flex items-center justify-center p-4">
                {selectedMedia.type === "image" ? (
                  <img
                    src={selectedMedia.preview}
                    alt="Full view"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <video
                    src={selectedMedia.preview}
                    controls
                    className="max-w-full max-h-full object-contain rounded-lg"
                    autoPlay
                  />
                )}
              </div>

              {/* Media Info */}
              <div className="fixed bottom-4 left-4 bg-black/70 text-white px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">{selectedMedia.file.name}</p>
                <p className="text-xs text-gray-300">
                  {formatFileSize(selectedMedia.file.size)} •{" "}
                  {selectedMedia.type}
                </p>
                {mediaFiles.length > 1 && (
                  <p className="text-xs text-gray-300 mt-1">
                    {currentModalIndex + 1} dari {mediaFiles.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end bg-white pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="mr-4 bg-white text-blue-900 border-blue-900 hover:bg-gray-50 h-12 px-6 text-base"
          >
            Kembali
          </Button>
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white h-12 px-6 text-base"
          >
            Kirim
          </Button>
        </div>
      </form>
    </div>
  );
}