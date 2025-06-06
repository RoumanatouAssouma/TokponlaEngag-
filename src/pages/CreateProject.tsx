
import { useState, useCallback, ChangeEvent } from "react";
import { useTheme } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ImagePlus, Upload, MapPin, X, FileIcon } from "lucide-react";
import ChatbotAssistant from "@/components/ChatbotAssistant";

// Validation schema for project creation
const projectSchema = z.object({
  title: z.string().min(5, {
    message: "Le titre doit contenir au moins 5 caractères",
  }),
  description: z.string().min(20, {
    message: "La description doit contenir au moins 20 caractères",
  }),
  location: z.string().min(3, {
    message: "Veuillez indiquer un lieu valide",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  goalAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Le montant doit être un nombre positif",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La durée doit être un nombre positif",
  }),
});

// Fonction pour obtenir le type d'icône en fonction de l'extension du fichier
const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'pdf';
    case 'doc':
    case 'docx':
      return 'doc';
    case 'xls':
    case 'xlsx':
      return 'excel';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image';
    default:
      return 'file';
  }
};

const CreateProject = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const { toast } = useToast();
  
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      goalAmount: "",
      duration: "",
    },
  });

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Vérifier le type et la taille du fichier
      if (!file.type.includes('image/')) {
        toast({
          title: "Format invalide",
          description: "Veuillez sélectionner un fichier image (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "Fichier trop volumineux",
          description: "L'image ne doit pas dépasser 5 MB",
          variant: "destructive"
        });
        return;
      }
      
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
      
      toast({
        title: "Image ajoutée",
        description: "L'image de couverture a été ajoutée avec succès.",
      });
    }
  };

  const handleAdditionalImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Vérifier les fichiers
      const validFiles = fileArray.filter(file => {
        if (!file.type.includes('image/')) {
          toast({
            title: "Format invalide",
            description: `${file.name} n'est pas une image`,
            variant: "destructive"
          });
          return false;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "Fichier trop volumineux",
            description: `${file.name} dépasse 5 MB`,
            variant: "destructive"
          });
          return false;
        }
        
        return true;
      });
      
      if (validFiles.length > 0) {
        setAdditionalImages(prev => [...prev, ...validFiles]);
        
        // Créer les URLs pour les aperçus
        const newImageUrls = validFiles.map(file => URL.createObjectURL(file));
        setImagesPreviews(prev => [...prev, ...newImageUrls]);
        
        toast({
          title: "Images ajoutées",
          description: `${validFiles.length} image(s) ajoutée(s) à la galerie.`,
        });
      }
    }
  };

  const handleAttachmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      
      // Vérifier les fichiers
      const validFiles = fileArray.filter(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB
          toast({
            title: "Fichier trop volumineux",
            description: `${file.name} dépasse 10 MB`,
            variant: "destructive"
          });
          return false;
        }
        return true;
      });
      
      if (validFiles.length > 0) {
        setAttachments(prev => [...prev, ...validFiles]);
        toast({
          title: "Documents ajoutés",
          description: `${validFiles.length} document(s) ajouté(s) avec succès.`,
        });
      }
    }
  };

  const removeImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    
    // Libérer l'URL de l'aperçu pour éviter les fuites de mémoire
    URL.revokeObjectURL(imagesPreviews[index]);
    setImagesPreviews(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Image supprimée",
      description: "L'image a été retirée de la galerie.",
    });
  };

  const removeCoverImage = () => {
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }
    setCoverImage(null);
    setCoverPreview(null);
    
    toast({
      title: "Image supprimée",
      description: "L'image de couverture a été supprimée.",
    });
  };

  // Gestionnaires pour le drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: 'cover' | 'gallery' | 'attachments') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (type === 'cover' && e.dataTransfer.files[0]) {
        // Simuler le changement d'image de couverture
        const event = {
          target: {
            files: [e.dataTransfer.files[0]]
          }
        } as unknown as ChangeEvent<HTMLInputElement>;
        handleCoverImageChange(event);
      } else if (type === 'gallery') {
        // Simuler le changement d'images additionnelles
        const event = {
          target: {
            files: e.dataTransfer.files
          }
        } as unknown as ChangeEvent<HTMLInputElement>;
        handleAdditionalImagesChange(event);
      } else if (type === 'attachments') {
        // Simuler le changement de pièces jointes
        const event = {
          target: {
            files: e.dataTransfer.files
          }
        } as unknown as ChangeEvent<HTMLInputElement>;
        handleAttachmentsChange(event);
      }
    }
  }, [handleCoverImageChange, handleAdditionalImagesChange, handleAttachmentsChange]);

  const onSubmit = (values: z.infer<typeof projectSchema>) => {
    // Dans une vraie application, nous enverrions les données au serveur ici
    console.log("Données du formulaire:", values);
    console.log("Image de couverture:", coverImage);
    console.log("Images additionnelles:", additionalImages);
    console.log("Pièces jointes:", attachments);

    toast({
      title: "Projet soumis avec succès",
      description: "Votre projet est en cours d'examen. Vous serez notifié une fois approuvé.",
    });

    // Libérer les URLs des aperçus
    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }
    
    imagesPreviews.forEach(url => URL.revokeObjectURL(url));

    // Réinitialiser le formulaire après la soumission
    form.reset();
    setCoverImage(null);
    setCoverPreview(null);
    setAdditionalImages([]);
    setImagesPreviews([]);
    setAttachments([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleDarkMode={toggleTheme} isDarkMode={isDarkMode} />
      <main className="flex-grow py-8">
        <div className="tokponla-container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Proposer un projet</h1>
            <p className="text-muted-foreground">
              Soumettez votre initiative communautaire pour obtenir du soutien et du financement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Section des informations de base du projet */}
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Informations de base</h2>
                    
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Titre du projet</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Rénovation du parc communautaire" {...field} />
                          </FormControl>
                          <FormDescription>
                            Choisissez un titre accrocheur qui décrit clairement votre projet.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Description détaillée</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez l'objectif, le contexte et l'impact attendu de votre projet..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Expliquez clairement le problème que votre projet résoudra et les bénéfices pour la communauté.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mb-4">
                      <Label htmlFor="coverImage">Image de couverture</Label>
                      <div 
                        className={`mt-1 border-2 ${dragActive ? 'border-tokponla-primary bg-tokponla-primary/5' : 'border-dashed border-border'} rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors`}
                        onClick={() => document.getElementById('coverImage')?.click()}
                        onDragEnter={(e) => handleDrag(e)}
                        onDragOver={(e) => handleDrag(e)}
                        onDragLeave={(e) => handleDrag(e)}
                        onDrop={(e) => handleDrop(e, 'cover')}
                      >
                        {coverPreview ? (
                          <div className="relative">
                            <img src={coverPreview} alt="Aperçu" className="max-h-[200px] mx-auto rounded-md" />
                            <Button 
                              type="button" 
                              variant="secondary" 
                              size="sm" 
                              className="absolute top-2 right-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeCoverImage();
                              }}
                            >
                              <X size={16} className="mr-1" /> Supprimer
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Cliquez ou déposez une image de couverture</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (max. 5MB)</p>
                          </div>
                        )}
                        <Input 
                          id="coverImage" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleCoverImageChange}
                        />
                      </div>
                    </div>
                    
                    {/* Galerie d'images (nouvelle section) */}
                    <div className="mb-4">
                      <Label htmlFor="additionalImages">Images du projet (optionnel)</Label>
                      <div 
                        className={`mt-1 border-2 ${dragActive ? 'border-tokponla-primary bg-tokponla-primary/5' : 'border-dashed border-border'} rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors`}
                        onClick={() => document.getElementById('additionalImages')?.click()}
                        onDragEnter={(e) => handleDrag(e)}
                        onDragOver={(e) => handleDrag(e)}
                        onDragLeave={(e) => handleDrag(e)}
                        onDrop={(e) => handleDrop(e, 'gallery')}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Ajoutez des images supplémentaires de votre projet</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (max. 5MB)</p>
                        </div>
                        <Input 
                          id="additionalImages" 
                          type="file" 
                          multiple 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleAdditionalImagesChange}
                        />
                      </div>
                      
                      {imagesPreviews.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {imagesPreviews.map((imgUrl, index) => (
                            <div key={index} className="relative h-32 rounded-md overflow-hidden border border-border">
                              <img 
                                src={imgUrl} 
                                alt={`Image ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="icon" 
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => removeImage(index)}
                              >
                                <X size={14} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lieu du projet</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                                <Input placeholder="Ex: Cotonou, Bénin" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="environment">Environnement</SelectItem>
                                <SelectItem value="education">Éducation</SelectItem>
                                <SelectItem value="health">Santé</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="culture">Culture</SelectItem>
                                <SelectItem value="energy">Énergie</SelectItem>
                                <SelectItem value="technology">Technologie</SelectItem>
                                <SelectItem value="entrepreneurship">Entrepreneuriat</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Section de financement */}
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Financement et Durée</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="goalAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Montant souhaité (FCFA)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Ex: 1000000" {...field} />
                            </FormControl>
                            <FormDescription>
                              Estimation réaliste du budget nécessaire
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Durée de la campagne (jours)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Ex: 30" {...field} />
                            </FormControl>
                            <FormDescription>
                              Nombre de jours pour atteindre votre objectif
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Section des documents */}
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="text-xl font-semibold mb-4">Documents complémentaires</h2>
                    
                    <div className="mb-4">
                      <Label htmlFor="attachments">Pièces jointes (optionnel)</Label>
                      <div 
                        className={`mt-1 border-2 ${dragActive ? 'border-tokponla-primary bg-tokponla-primary/5' : 'border-dashed border-border'} rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors`}
                        onClick={() => document.getElementById('attachments')?.click()}
                        onDragEnter={(e) => handleDrag(e)}
                        onDragOver={(e) => handleDrag(e)}
                        onDragLeave={(e) => handleDrag(e)}
                        onDrop={(e) => handleDrop(e, 'attachments')}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Cliquez ou déposez des documents ici</p>
                          <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS (max. 10MB)</p>
                        </div>
                        <Input 
                          id="attachments" 
                          type="file" 
                          multiple 
                          className="hidden" 
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          onChange={handleAttachmentsChange}
                        />
                      </div>
                      
                      {attachments.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Documents téléchargés:</p>
                          <ul className="space-y-2">
                            {attachments.map((file, index) => (
                              <li key={index} className="text-sm flex justify-between items-center p-3 bg-muted rounded">
                                <div className="flex items-center">
                                  <div className="p-2 bg-tokponla-primary/10 text-tokponla-primary rounded mr-3">
                                    <FileIcon size={18} />
                                  </div>
                                  <div>
                                    <p className="font-medium truncate max-w-[180px] sm:max-w-[300px]">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                                  </div>
                                </div>
                                <Button 
                                  type="button"
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    setAttachments(attachments.filter((_, i) => i !== index));
                                  }}
                                >
                                  Supprimer
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-blue-950 hover:bg-tokponla-primary/90">
                      Soumettre le projet
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className="md:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border sticky top-20">
                <h2 className="text-xl font-semibold mb-4">Conseils pour réussir</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Soyez précis et concis</h3>
                    <p className="text-sm text-muted-foreground">Expliquez clairement votre projet et son impact attendu.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Ajoutez des visuels de qualité</h3>
                    <p className="text-sm text-muted-foreground">Une bonne image de couverture augmente significativement le taux de soutien.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Détaillez votre budget</h3>
                    <p className="text-sm text-muted-foreground">Mentionnez comment les fonds seront utilisés pour gagner la confiance des contributeurs.</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Partagez votre parcours</h3>
                    <p className="text-sm text-muted-foreground">Présentez votre organisation et son expérience dans des projets similaires.</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm">Les projets sont analysés par notre système IA et approuvés par notre équipe sous 48 heures ouvrables.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotAssistant />
    </div>
  );
};

export default CreateProject;
