import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  is_verified: boolean;
  is_superadmin: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sp_access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    // Simulated auth check
    setUser({
      id: "demo-user-uuid",
      email: "demo@seopilot.ai",
      full_name: "Alex Mercer",
      is_verified: true,
      is_superadmin: false
    });
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("sp_access_token");
    localStorage.removeItem("sp_active_org_id");
    setUser(null);
    router.push("/login");
  };

  return { user, isLoading, logout, isAuthenticated: !!user };
}
