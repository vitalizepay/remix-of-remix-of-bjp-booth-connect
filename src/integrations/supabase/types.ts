export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      booth_assignments: {
        Row: {
          assigned_at: string | null
          booth_id: string
          id: string
          volunteer_id: string
        }
        Insert: {
          assigned_at?: string | null
          booth_id: string
          id?: string
          volunteer_id: string
        }
        Update: {
          assigned_at?: string | null
          booth_id?: string
          id?: string
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "booth_assignments_booth_id_fkey"
            columns: ["booth_id"]
            isOneToOne: false
            referencedRelation: "booths"
            referencedColumns: ["id"]
          },
        ]
      }
      booths: {
        Row: {
          bjp_members: number | null
          bjp_supporters: number | null
          booth_domain: string | null
          booth_index: number | null
          booth_number: string
          booth_type: string | null
          created_at: string | null
          district_id: string | null
          doors_covered: number | null
          id: string
          latitude: number | null
          longitude: number | null
          pages_covered: number | null
          total_doors: number | null
          total_pages: number | null
          total_voters: number | null
          updated_at: string | null
        }
        Insert: {
          bjp_members?: number | null
          bjp_supporters?: number | null
          booth_domain?: string | null
          booth_index?: number | null
          booth_number: string
          booth_type?: string | null
          created_at?: string | null
          district_id?: string | null
          doors_covered?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pages_covered?: number | null
          total_doors?: number | null
          total_pages?: number | null
          total_voters?: number | null
          updated_at?: string | null
        }
        Update: {
          bjp_members?: number | null
          bjp_supporters?: number | null
          booth_domain?: string | null
          booth_index?: number | null
          booth_number?: string
          booth_type?: string | null
          created_at?: string | null
          district_id?: string | null
          doors_covered?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          pages_covered?: number | null
          total_doors?: number | null
          total_pages?: number | null
          total_voters?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booths_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          name: string
          name_tamil: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          name: string
          name_tamil?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          name?: string
          name_tamil?: string | null
        }
        Relationships: []
      }
      doors: {
        Row: {
          assigned_volunteer_id: string | null
          covered_at: string | null
          created_at: string | null
          door_number: string
          id: string
          is_covered: boolean | null
          notes: string | null
          page_id: string | null
        }
        Insert: {
          assigned_volunteer_id?: string | null
          covered_at?: string | null
          created_at?: string | null
          door_number: string
          id?: string
          is_covered?: boolean | null
          notes?: string | null
          page_id?: string | null
        }
        Update: {
          assigned_volunteer_id?: string | null
          covered_at?: string | null
          created_at?: string | null
          door_number?: string
          id?: string
          is_covered?: boolean | null
          notes?: string | null
          page_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "doors_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          admin_response: string | null
          attachment_url: string | null
          category: string
          created_at: string | null
          description: string | null
          id: string
          status: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_response?: string | null
          attachment_url?: string | null
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_response?: string | null
          attachment_url?: string | null
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          status?: Database["public"]["Enums"]["ticket_status"] | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          assigned_volunteer_id: string | null
          created_at: string | null
          doors_covered: number | null
          id: string
          page_number: number
          street_id: string | null
          total_doors: number | null
        }
        Insert: {
          assigned_volunteer_id?: string | null
          created_at?: string | null
          doors_covered?: number | null
          id?: string
          page_number: number
          street_id?: string | null
          total_doors?: number | null
        }
        Update: {
          assigned_volunteer_id?: string | null
          created_at?: string | null
          doors_covered?: number | null
          id?: string
          page_number?: number
          street_id?: string | null
          total_doors?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_street_id_fkey"
            columns: ["street_id"]
            isOneToOne: false
            referencedRelation: "streets"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      streets: {
        Row: {
          booth_id: string | null
          created_at: string | null
          id: string
          name: string
          name_tamil: string | null
          total_pages: number | null
        }
        Insert: {
          booth_id?: string | null
          created_at?: string | null
          id?: string
          name: string
          name_tamil?: string | null
          total_pages?: number | null
        }
        Update: {
          booth_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          name_tamil?: string | null
          total_pages?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "streets_booth_id_fkey"
            columns: ["booth_id"]
            isOneToOne: false
            referencedRelation: "booths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voters: {
        Row: {
          address: string | null
          age: number | null
          booth_id: string | null
          care_taker_id: string | null
          community: string | null
          created_at: string | null
          door_id: string | null
          door_number: string | null
          father_name: string | null
          father_name_tamil: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          is_family_member: boolean | null
          is_member: boolean | null
          name: string
          name_tamil: string | null
          page_number: number | null
          phone: string | null
          photo_url: string | null
          religion: string | null
          support_status: Database["public"]["Enums"]["support_status"] | null
          updated_at: string | null
          voter_id: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          booth_id?: string | null
          care_taker_id?: string | null
          community?: string | null
          created_at?: string | null
          door_id?: string | null
          door_number?: string | null
          father_name?: string | null
          father_name_tamil?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          is_family_member?: boolean | null
          is_member?: boolean | null
          name: string
          name_tamil?: string | null
          page_number?: number | null
          phone?: string | null
          photo_url?: string | null
          religion?: string | null
          support_status?: Database["public"]["Enums"]["support_status"] | null
          updated_at?: string | null
          voter_id?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          booth_id?: string | null
          care_taker_id?: string | null
          community?: string | null
          created_at?: string | null
          door_id?: string | null
          door_number?: string | null
          father_name?: string | null
          father_name_tamil?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          is_family_member?: boolean | null
          is_member?: boolean | null
          name?: string
          name_tamil?: string | null
          page_number?: number | null
          phone?: string | null
          photo_url?: string | null
          religion?: string | null
          support_status?: Database["public"]["Enums"]["support_status"] | null
          updated_at?: string | null
          voter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voters_booth_id_fkey"
            columns: ["booth_id"]
            isOneToOne: false
            referencedRelation: "booths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voters_door_id_fkey"
            columns: ["door_id"]
            isOneToOne: false
            referencedRelation: "doors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "super_admin" | "district_admin" | "booth_admin" | "volunteer"
      gender_type: "male" | "female" | "other"
      support_status:
        | "supporter"
        | "neutral"
        | "opponent"
        | "postal_voter"
        | "dead"
        | "deleted"
      ticket_status: "open" | "in_progress" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["super_admin", "district_admin", "booth_admin", "volunteer"],
      gender_type: ["male", "female", "other"],
      support_status: [
        "supporter",
        "neutral",
        "opponent",
        "postal_voter",
        "dead",
        "deleted",
      ],
      ticket_status: ["open", "in_progress", "closed"],
    },
  },
} as const
