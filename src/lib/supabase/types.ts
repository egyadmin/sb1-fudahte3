export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      strategic_metrics: {
        Row: {
          id: string
          title_en: string
          title_ar: string
          completion: number
          trend: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ar: string
          completion: number
          trend: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title_en?: string
          title_ar?: string
          completion?: number
          trend?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      strategic_resources: {
        Row: {
          id: string
          title_en: string
          title_ar: string
          efficiency: number
          description_en: string | null
          description_ar: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ar: string
          efficiency: number
          description_en?: string | null
          description_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title_en?: string
          title_ar?: string
          efficiency?: number
          description_en?: string | null
          description_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      strategic_quality: {
        Row: {
          id: string
          title_en: string
          title_ar: string
          status: 'improved' | 'stable' | 'declined'
          description_en: string | null
          description_ar: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ar: string
          status: 'improved' | 'stable' | 'declined'
          description_en?: string | null
          description_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title_en?: string
          title_ar?: string
          status?: 'improved' | 'stable' | 'declined'
          description_en?: string | null
          description_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      strategic_improvements: {
        Row: {
          id: string
          title_en: string
          title_ar: string
          status: 'planned' | 'in-progress' | 'completed'
          progress: number
          impact_en: string | null
          impact_ar: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title_en: string
          title_ar: string
          status: 'planned' | 'in-progress' | 'completed'
          progress: number
          impact_en?: string | null
          impact_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title_en?: string
          title_ar?: string
          status?: 'planned' | 'in-progress' | 'completed'
          progress?: number
          impact_en?: string | null
          impact_ar?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}