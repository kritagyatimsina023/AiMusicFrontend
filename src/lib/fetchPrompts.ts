"use client";
import Cookies from "js-cookie";
import api from "../../utils/api";
export const fetchUserPrompts = async () => {
  try {
    const userId = Cookies.get("userId");
    if (!userId) throw new Error("User ID not found in cookies");
    const res = await api.get(`/prompts/${userId}`);
    return res.data.promptData;
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return [];
  }
};
