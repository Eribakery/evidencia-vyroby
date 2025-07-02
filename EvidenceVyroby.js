import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function EvidenceVyroby() {
  const [zaznamy, setZaznamy] = useState([]);
  const [datum, setDatum] = useState(format(new Date(), "yyyy-MM-dd"));
  const [cinnost, setCinnost] = useState("");
  const [pocetDavok, setPocetDavok] = useState("");
  const [pocetBalikov, setPocetBalikov] = useState("");
  const [poznamka, setPoznamka] = useState("");
  const [casPrichodu, setCasPrichodu] = useState("");
  const [casOdchodu, setCasOdchodu] = useState("");

  const vypocitajOdpracovanyCas = () => {
    if (!casPrichodu || !casOdchodu) return "";
    const [h1, m1] = casPrichodu.split(":").map(Number);
    const [h2, m2] = casOdchodu.split(":").map(Number);
    const minuty = (h2 * 60 + m2) - (h1 * 60 + m1);
    const hodiny = Math.floor(minuty / 60);
    const zvysneMinuty = minuty % 60;
    return `${hodiny}h ${zvysneMinuty}min`;
  };

  const pridatZaznam = () => {
    if (!cinnost || !pocetDavok || !pocetBalikov) return;
    const novyZaznam = {
      datum,
      cinnost,
      pocetDavok,
      pocetBalikov,
      poznamka,
      casPrichodu,
      casOdchodu,
      odpracovanyCas: vypocitajOdpracovanyCas()
    };
    setZaznamy([novyZaznam, ...zaznamy]);
    setCinnost("");
    setPocetDavok("");
    setPocetBalikov("");
    setPoznamka("");
    setCasPrichodu("");
    setCasOdchodu("");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="space-y-3 pt-4">
          <Input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} />
          <Input placeholder="Činnosť (napr. Tyčinky – dlhé slané)" value={cinnost} onChange={(e) => setCinnost(e.target.value)} />
          <Input placeholder="Počet dávok" type="number" value={pocetDavok} onChange={(e) => setPocetDavok(e.target.value)} />
          <Input placeholder="Počet balíkov" type="number" value={pocetBalikov} onChange={(e) => setPocetBalikov(e.target.value)} />
          <Input type="time" value={casPrichodu} onChange={(e) => setCasPrichodu(e.target.value)} />
          <Input type="time" value={casOdchodu} onChange={(e) => setCasOdchodu(e.target.value)} />
          <Textarea placeholder="Poznámka (nepovinné)" value={poznamka} onChange={(e) => setPoznamka(e.target.value)} />
          <Button onClick={pridatZaznam}>Uložiť záznam</Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {zaznamy.map((z, index) => (
          <Card key={index} className="bg-gray-50">
            <CardContent className="pt-4">
              <p><strong>Dátum:</strong> {z.datum}</p>
              <p><strong>Činnosť:</strong> {z.cinnost}</p>
              <p><strong>Počet dávok:</strong> {z.pocetDavok}</p>
              <p><strong>Počet balíkov:</strong> {z.pocetBalikov}</p>
              <p><strong>Čas príchodu:</strong> {z.casPrichodu}</p>
              <p><strong>Čas odchodu:</strong> {z.casOdchodu}</p>
              <p><strong>Odpracovaný čas:</strong> {z.odpracovanyCas}</p>
              {z.poznamka && <p><strong>Poznámka:</strong> {z.poznamka}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}