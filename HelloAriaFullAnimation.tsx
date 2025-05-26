import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelloAriaFullAnimation() {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setScene(1), 3000),  // 3s -> scene1
      setTimeout(() => setScene(2), 7000),  // 7s -> scene2
      setTimeout(() => setScene(3), 12000), // 12s -> scene3
      setTimeout(() => setScene(4), 16000), // 16s -> scene4
      setTimeout(() => setScene(5), 20000), // 20s -> scene5
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      <AnimatePresence>
        {scene === 0 && (
          <motion.div
            key="0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/clutter-desk.jpg')" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="p-4 bg-white/80 rounded-lg text-xl font-semibold"
            >
              "Feeling buried under tasks and reminders?"
            </motion.div>
          </motion.div>
        )}

        {scene === 1 && (
          <motion.div
            key="1"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-white flex items-center justify-center"
          >
            {/* WhatsApp Chat window placeholder */}
            <div className="w-[360px] h-[640px] border rounded-xl bg-green-50">
              <p className="text-center mt-4 font-medium">WhatsApp Chat</p>
            </div>
          </motion.div>
        )}

        {scene === 2 && (
          <motion.div
            key="2"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[360px] h-[640px] border rounded-xl bg-white p-4">
              <div className="flex flex-col gap-2">
                <div className="self-end bg-green-500 text-white px-3 py-2 rounded-lg">
                  Remind me to call mom every Sunday.
                </div>
                <div className="self-start bg-gray-200 px-3 py-2 rounded-lg">
                  Reminder created! ✅
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {scene === 3 && (
          <motion.div
            key="3"
            initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <div className="w-[360px] h-[640px] border rounded-xl bg-white p-6 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <p className="text-lg">Snap a photo of your grocery list</p>
              <div className="w-full bg-green-50 p-4 rounded-lg">
                <p>→ Milk</p>
                <p>→ Eggs</p>
                <p>→ Bread</p>
              </div>
            </div>
          </motion.div>
        )}

        {scene === 4 && (
          <motion.div
            key="4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black text-white"
          >
            <div className="w-[360px] h-[640px] border rounded-xl bg-gray-900 p-4 flex flex-col justify-between">
              <div className="self-center text-lg">"Drink water at 3PM"</div>
              <button className="self-center bg-green-600 px-4 py-2 rounded-lg">✔️ Done</button>
            </div>
          </motion.div>
        )}

        {scene === 5 && (
          <motion.div
            key="5"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex items-center justify-center bg-white"
          >
            <div className="w-[400px] h-[300px] border rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <div className="flex justify-around">
                <div className="flex flex-col items-center"><span className="text-4xl">👪</span><p>Family</p></div>
                <div className="flex flex-col items-center"><span className="text-4xl">👥</span><p>Friends</p></div>
                <div className="flex flex-col items-center"><span className="text-4xl">💼</span><p>Work</p></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
