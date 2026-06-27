"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

type Profile = {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  occupation: string;
  role: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");

  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    occupation: "",
    role: "student",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    setUserId(session.user.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
    }

    if (data) {
      setProfile({
        full_name: data.full_name ?? "",
        email: data.email ?? session.user.email ?? "",
        phone: data.phone ?? "",
        country: data.country ?? "",
        state: data.state ?? "",
        occupation: data.occupation ?? "",
        role: data.role ?? "student",
      });
    }

    setLoading(false);
  }

  async function saveProfile() {
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        country: profile.country,
        state: profile.state,
        occupation: profile.occupation,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      alert("Failed to update profile.");
      console.error(error);
      return;
    }

    alert("Profile updated successfully.");
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading profile...
      </section>
    );
  }

  const initials =
    profile.full_name.length > 0
      ? profile.full_name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

  return (
    <section className="min-h-screen bg-black text-white pt-16 md:pt-24">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-400 mt-2">Manage your personal information.</p>

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-green-500 text-black flex items-center justify-center text-3xl font-bold">
              {initials}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {profile.full_name || "Student"}
              </h2>

              <p className="text-green-400 capitalize">{profile.role}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div>
              <label className="text-gray-400 text-sm">Full Name</label>

              <input
                className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                value={profile.full_name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    full_name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email</label>

              <input
                disabled
                className="w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 cursor-not-allowed"
                value={profile.email}
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Phone</label>

              <input
                className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Country</label>

              <input
                className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                value={profile.country}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    country: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">State</label>

              <input
                className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                value={profile.state}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    state: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Occupation</label>

              <input
                className="w-full mt-2 bg-black border border-gray-700 rounded-lg px-4 py-3"
                value={profile.occupation}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    occupation: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="mt-8 bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </section>
  );
}
