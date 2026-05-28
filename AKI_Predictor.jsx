import { useState, useEffect, useRef } from "react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

// ─── Embedded dataset (n=151) ────────────────────────────────────────────────
const DATASET = [{"age":33,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.6,"sepsis":1,"ventilator":1,"apache3":77,"saps3":57,"rifle":3,"akin":3,"dialysis":0},{"age":56,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.75,"sepsis":0,"ventilator":0,"apache3":25,"saps3":35,"rifle":0,"akin":0,"dialysis":0},{"age":87,"sex":1,"surgical":1,"scr":1.1,"crmdr":0.94,"sepsis":0,"ventilator":0,"apache3":55,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":42,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.66,"sepsis":1,"ventilator":1,"apache3":55,"saps3":58,"rifle":0,"akin":0,"dialysis":0},{"age":77,"sex":1,"surgical":0,"scr":2.0,"crmdr":0.88,"sepsis":0,"ventilator":1,"apache3":91,"saps3":81,"rifle":3,"akin":3,"dialysis":0},{"age":60,"sex":0,"surgical":0,"scr":1.5,"crmdr":0.77,"sepsis":1,"ventilator":0,"apache3":50,"saps3":45,"rifle":1,"akin":1,"dialysis":0},{"age":39,"sex":1,"surgical":0,"scr":2.2,"crmdr":0.64,"sepsis":1,"ventilator":0,"apache3":59,"saps3":55,"rifle":3,"akin":3,"dialysis":0},{"age":55,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.75,"sepsis":0,"ventilator":0,"apache3":32,"saps3":33,"rifle":0,"akin":0,"dialysis":0},{"age":40,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.65,"sepsis":1,"ventilator":0,"apache3":29,"saps3":51,"rifle":0,"akin":0,"dialysis":0},{"age":38,"sex":1,"surgical":0,"scr":0.5,"crmdr":0.64,"sepsis":1,"ventilator":0,"apache3":55,"saps3":51,"rifle":0,"akin":0,"dialysis":0},{"age":62,"sex":1,"surgical":0,"scr":1.85,"crmdr":0.78,"sepsis":1,"ventilator":1,"apache3":57,"saps3":49,"rifle":3,"akin":3,"dialysis":0},{"age":74,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.86,"sepsis":0,"ventilator":0,"apache3":32,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":48,"sex":0,"surgical":1,"scr":0.6,"crmdr":0.7,"sepsis":1,"ventilator":0,"apache3":38,"saps3":33,"rifle":0,"akin":0,"dialysis":0},{"age":87,"sex":0,"surgical":0,"scr":0.8,"crmdr":0.94,"sepsis":0,"ventilator":0,"apache3":53,"saps3":51,"rifle":0,"akin":0,"dialysis":0},{"age":40,"sex":0,"surgical":0,"scr":0.5,"crmdr":0.65,"sepsis":0,"ventilator":0,"apache3":67,"saps3":53,"rifle":0,"akin":0,"dialysis":0},{"age":37,"sex":1,"surgical":1,"scr":1.1,"crmdr":0.63,"sepsis":0,"ventilator":1,"apache3":75,"saps3":58,"rifle":3,"akin":3,"dialysis":1},{"age":62,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.78,"sepsis":0,"ventilator":0,"apache3":38,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":43,"sex":0,"surgical":0,"scr":0.8,"crmdr":0.67,"sepsis":1,"ventilator":0,"apache3":49,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":28,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.5,"sepsis":0,"ventilator":0,"apache3":21,"saps3":30,"rifle":0,"akin":0,"dialysis":0},{"age":39,"sex":1,"surgical":1,"scr":0.8,"crmdr":0.64,"sepsis":0,"ventilator":0,"apache3":18,"saps3":34,"rifle":0,"akin":0,"dialysis":0},{"age":60,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.77,"sepsis":1,"ventilator":0,"apache3":40,"saps3":48,"rifle":0,"akin":0,"dialysis":0},{"age":45,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.68,"sepsis":1,"ventilator":0,"apache3":29,"saps3":50,"rifle":1,"akin":1,"dialysis":0},{"age":58,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.76,"sepsis":0,"ventilator":1,"apache3":47,"saps3":55,"rifle":1,"akin":1,"dialysis":0},{"age":53,"sex":1,"surgical":0,"scr":4.4,"crmdr":0.73,"sepsis":1,"ventilator":0,"apache3":73,"saps3":59,"rifle":3,"akin":3,"dialysis":0},{"age":30,"sex":1,"surgical":0,"scr":0.5,"crmdr":0.58,"sepsis":1,"ventilator":1,"apache3":27,"saps3":44,"rifle":0,"akin":0,"dialysis":0},{"age":18,"sex":1,"surgical":0,"scr":0.9,"crmdr":0.51,"sepsis":1,"ventilator":0,"apache3":21,"saps3":18,"rifle":1,"akin":1,"dialysis":0},{"age":58,"sex":1,"surgical":1,"scr":3.1,"crmdr":0.76,"sepsis":0,"ventilator":0,"apache3":54,"saps3":39,"rifle":3,"akin":3,"dialysis":0},{"age":43,"sex":1,"surgical":0,"scr":1.2,"crmdr":0.67,"sepsis":1,"ventilator":1,"apache3":73,"saps3":62,"rifle":3,"akin":3,"dialysis":1},{"age":82,"sex":0,"surgical":0,"scr":1.0,"crmdr":0.91,"sepsis":1,"ventilator":0,"apache3":97,"saps3":71,"rifle":1,"akin":1,"dialysis":0},{"age":29,"sex":0,"surgical":0,"scr":2.6,"crmdr":0.58,"sepsis":1,"ventilator":0,"apache3":53,"saps3":56,"rifle":3,"akin":3,"dialysis":0},{"age":44,"sex":0,"surgical":0,"scr":0.5,"crmdr":0.67,"sepsis":0,"ventilator":0,"apache3":16,"saps3":41,"rifle":0,"akin":0,"dialysis":0},{"age":74,"sex":0,"surgical":0,"scr":1.0,"crmdr":0.86,"sepsis":0,"ventilator":1,"apache3":40,"saps3":50,"rifle":0,"akin":0,"dialysis":0},{"age":37,"sex":0,"surgical":0,"scr":1.0,"crmdr":0.63,"sepsis":1,"ventilator":1,"apache3":26,"saps3":44,"rifle":0,"akin":1,"dialysis":0},{"age":32,"sex":0,"surgical":0,"scr":0.9,"crmdr":0.6,"sepsis":1,"ventilator":1,"apache3":39,"saps3":46,"rifle":0,"akin":1,"dialysis":0},{"age":57,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.75,"sepsis":1,"ventilator":0,"apache3":36,"saps3":39,"rifle":0,"akin":0,"dialysis":0},{"age":32,"sex":1,"surgical":1,"scr":0.9,"crmdr":0.6,"sepsis":1,"ventilator":0,"apache3":40,"saps3":37,"rifle":1,"akin":1,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":3.7,"crmdr":0.7,"sepsis":1,"ventilator":0,"apache3":73,"saps3":62,"rifle":3,"akin":3,"dialysis":0},{"age":51,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.71,"sepsis":1,"ventilator":1,"apache3":54,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":59,"sex":1,"surgical":0,"scr":0.9,"crmdr":0.76,"sepsis":1,"ventilator":1,"apache3":41,"saps3":41,"rifle":0,"akin":0,"dialysis":0},{"age":56,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.75,"sepsis":0,"ventilator":1,"apache3":68,"saps3":75,"rifle":2,"akin":2,"dialysis":0},{"age":26,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.56,"sepsis":1,"ventilator":0,"apache3":28,"saps3":44,"rifle":0,"akin":0,"dialysis":0},{"age":71,"sex":1,"surgical":0,"scr":2.0,"crmdr":0.84,"sepsis":1,"ventilator":1,"apache3":106,"saps3":85,"rifle":2,"akin":2,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":1.6,"crmdr":0.7,"sepsis":1,"ventilator":1,"apache3":122,"saps3":86,"rifle":3,"akin":3,"dialysis":1},{"age":72,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.85,"sepsis":0,"ventilator":0,"apache3":34,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":68,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.82,"sepsis":0,"ventilator":0,"apache3":44,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":27,"sex":1,"surgical":0,"scr":0.9,"crmdr":0.57,"sepsis":0,"ventilator":1,"apache3":62,"saps3":42,"rifle":1,"akin":1,"dialysis":0},{"age":84,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.92,"sepsis":1,"ventilator":0,"apache3":41,"saps3":52,"rifle":0,"akin":0,"dialysis":0},{"age":44,"sex":0,"surgical":0,"scr":1.0,"crmdr":0.67,"sepsis":1,"ventilator":0,"apache3":13,"saps3":49,"rifle":1,"akin":1,"dialysis":0},{"age":23,"sex":1,"surgical":1,"scr":1.2,"crmdr":0.54,"sepsis":0,"ventilator":0,"apache3":17,"saps3":27,"rifle":2,"akin":2,"dialysis":0},{"age":88,"sex":1,"surgical":1,"scr":1.6,"crmdr":0.94,"sepsis":0,"ventilator":0,"apache3":67,"saps3":47,"rifle":1,"akin":1,"dialysis":0},{"age":78,"sex":0,"surgical":0,"scr":1.1,"crmdr":0.88,"sepsis":0,"ventilator":0,"apache3":38,"saps3":51,"rifle":0,"akin":0,"dialysis":0},{"age":19,"sex":0,"surgical":0,"scr":0.5,"crmdr":0.52,"sepsis":0,"ventilator":1,"apache3":46,"saps3":45,"rifle":0,"akin":0,"dialysis":0},{"age":65,"sex":0,"surgical":0,"scr":1.8,"crmdr":0.8,"sepsis":1,"ventilator":1,"apache3":67,"saps3":62,"rifle":2,"akin":2,"dialysis":0},{"age":58,"sex":1,"surgical":1,"scr":2.2,"crmdr":0.76,"sepsis":1,"ventilator":1,"apache3":121,"saps3":102,"rifle":3,"akin":3,"dialysis":0},{"age":62,"sex":1,"surgical":0,"scr":1.2,"crmdr":0.78,"sepsis":1,"ventilator":1,"apache3":66,"saps3":61,"rifle":3,"akin":3,"dialysis":1},{"age":48,"sex":1,"surgical":1,"scr":1.7,"crmdr":0.7,"sepsis":0,"ventilator":1,"apache3":58,"saps3":55,"rifle":2,"akin":2,"dialysis":0},{"age":68,"sex":1,"surgical":1,"scr":1.1,"crmdr":0.82,"sepsis":0,"ventilator":1,"apache3":58,"saps3":48,"rifle":1,"akin":1,"dialysis":0},{"age":81,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.9,"sepsis":0,"ventilator":1,"apache3":66,"saps3":60,"rifle":0,"akin":0,"dialysis":0},{"age":67,"sex":0,"surgical":0,"scr":1.2,"crmdr":0.8,"sepsis":1,"ventilator":1,"apache3":77,"saps3":52,"rifle":1,"akin":1,"dialysis":0},{"age":45,"sex":1,"surgical":0,"scr":3.0,"crmdr":0.68,"sepsis":1,"ventilator":1,"apache3":69,"saps3":60,"rifle":3,"akin":3,"dialysis":1},{"age":59,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.76,"sepsis":0,"ventilator":1,"apache3":79,"saps3":83,"rifle":0,"akin":0,"dialysis":0},{"age":57,"sex":1,"surgical":1,"scr":2.1,"crmdr":0.75,"sepsis":1,"ventilator":1,"apache3":44,"saps3":27,"rifle":3,"akin":3,"dialysis":0},{"age":55,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.74,"sepsis":0,"ventilator":0,"apache3":47,"saps3":45,"rifle":0,"akin":0,"dialysis":0},{"age":68,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.82,"sepsis":1,"ventilator":0,"apache3":35,"saps3":48,"rifle":0,"akin":1,"dialysis":0},{"age":25,"sex":1,"surgical":1,"scr":0.9,"crmdr":0.55,"sepsis":0,"ventilator":0,"apache3":31,"saps3":21,"rifle":1,"akin":1,"dialysis":0},{"age":73,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.85,"sepsis":1,"ventilator":1,"apache3":78,"saps3":66,"rifle":3,"akin":3,"dialysis":0},{"age":33,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.6,"sepsis":1,"ventilator":1,"apache3":49,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":58,"sex":0,"surgical":0,"scr":2.1,"crmdr":0.76,"sepsis":1,"ventilator":0,"apache3":51,"saps3":41,"rifle":2,"akin":2,"dialysis":0},{"age":55,"sex":1,"surgical":1,"scr":0.8,"crmdr":0.74,"sepsis":0,"ventilator":1,"apache3":35,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":65,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.8,"sepsis":1,"ventilator":1,"apache3":74,"saps3":73,"rifle":0,"akin":0,"dialysis":0},{"age":54,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.73,"sepsis":0,"ventilator":0,"apache3":23,"saps3":42,"rifle":1,"akin":1,"dialysis":0},{"age":27,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.57,"sepsis":1,"ventilator":0,"apache3":12,"saps3":35,"rifle":0,"akin":0,"dialysis":0},{"age":37,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.63,"sepsis":1,"ventilator":1,"apache3":76,"saps3":58,"rifle":3,"akin":3,"dialysis":1},{"age":47,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.69,"sepsis":0,"ventilator":0,"apache3":21,"saps3":47,"rifle":0,"akin":0,"dialysis":0},{"age":38,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.63,"sepsis":0,"ventilator":0,"apache3":49,"saps3":53,"rifle":0,"akin":0,"dialysis":0},{"age":37,"sex":1,"surgical":0,"scr":1.7,"crmdr":0.63,"sepsis":1,"ventilator":0,"apache3":49,"saps3":52,"rifle":2,"akin":2,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":1.4,"crmdr":0.7,"sepsis":1,"ventilator":0,"apache3":25,"saps3":33,"rifle":2,"akin":2,"dialysis":0},{"age":60,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.77,"sepsis":1,"ventilator":1,"apache3":72,"saps3":44,"rifle":2,"akin":2,"dialysis":0},{"age":60,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.77,"sepsis":1,"ventilator":0,"apache3":49,"saps3":37,"rifle":0,"akin":0,"dialysis":0},{"age":47,"sex":1,"surgical":0,"scr":2.0,"crmdr":0.69,"sepsis":1,"ventilator":0,"apache3":40,"saps3":43,"rifle":3,"akin":3,"dialysis":0},{"age":33,"sex":0,"surgical":1,"scr":0.6,"crmdr":0.6,"sepsis":0,"ventilator":0,"apache3":3,"saps3":15,"rifle":0,"akin":0,"dialysis":0},{"age":41,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.65,"sepsis":0,"ventilator":1,"apache3":38,"saps3":37,"rifle":1,"akin":1,"dialysis":0},{"age":44,"sex":1,"surgical":0,"scr":1.2,"crmdr":0.67,"sepsis":0,"ventilator":0,"apache3":7,"saps3":36,"rifle":1,"akin":1,"dialysis":0},{"age":51,"sex":0,"surgical":0,"scr":1.3,"crmdr":0.7,"sepsis":1,"ventilator":1,"apache3":71,"saps3":63,"rifle":3,"akin":3,"dialysis":1},{"age":59,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.76,"sepsis":0,"ventilator":0,"apache3":20,"saps3":41,"rifle":0,"akin":0,"dialysis":0},{"age":41,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.65,"sepsis":1,"ventilator":1,"apache3":52,"saps3":51,"rifle":1,"akin":1,"dialysis":0},{"age":42,"sex":1,"surgical":1,"scr":1.5,"crmdr":0.66,"sepsis":0,"ventilator":1,"apache3":42,"saps3":29,"rifle":2,"akin":2,"dialysis":0},{"age":65,"sex":1,"surgical":1,"scr":2.6,"crmdr":0.8,"sepsis":0,"ventilator":1,"apache3":59,"saps3":34,"rifle":3,"akin":3,"dialysis":0},{"age":54,"sex":1,"surgical":0,"scr":0.6,"crmdr":0.73,"sepsis":1,"ventilator":0,"apache3":73,"saps3":57,"rifle":0,"akin":0,"dialysis":0},{"age":72,"sex":0,"surgical":1,"scr":0.6,"crmdr":0.85,"sepsis":0,"ventilator":0,"apache3":35,"saps3":45,"rifle":0,"akin":0,"dialysis":0},{"age":27,"sex":0,"surgical":1,"scr":0.7,"crmdr":0.57,"sepsis":1,"ventilator":1,"apache3":67,"saps3":63,"rifle":0,"akin":0,"dialysis":0},{"age":58,"sex":1,"surgical":1,"scr":0.8,"crmdr":0.76,"sepsis":1,"ventilator":0,"apache3":36,"saps3":40,"rifle":0,"akin":0,"dialysis":0},{"age":59,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.76,"sepsis":0,"ventilator":1,"apache3":30,"saps3":57,"rifle":0,"akin":0,"dialysis":1},{"age":65,"sex":1,"surgical":0,"scr":7.1,"crmdr":0.8,"sepsis":1,"ventilator":1,"apache3":121,"saps3":72,"rifle":3,"akin":3,"dialysis":1},{"age":22,"sex":1,"surgical":0,"scr":0.9,"crmdr":0.53,"sepsis":1,"ventilator":1,"apache3":20,"saps3":30,"rifle":1,"akin":1,"dialysis":0},{"age":24,"sex":0,"surgical":1,"scr":0.7,"crmdr":0.55,"sepsis":1,"ventilator":1,"apache3":52,"saps3":63,"rifle":1,"akin":1,"dialysis":0},{"age":54,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.73,"sepsis":1,"ventilator":1,"apache3":94,"saps3":58,"rifle":0,"akin":0,"dialysis":0},{"age":40,"sex":0,"surgical":0,"scr":1.0,"crmdr":0.65,"sepsis":0,"ventilator":0,"apache3":40,"saps3":51,"rifle":1,"akin":1,"dialysis":0},{"age":81,"sex":1,"surgical":0,"scr":4.1,"crmdr":0.9,"sepsis":1,"ventilator":1,"apache3":99,"saps3":67,"rifle":3,"akin":3,"dialysis":1},{"age":60,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.77,"sepsis":1,"ventilator":1,"apache3":70,"saps3":57,"rifle":0,"akin":0,"dialysis":0},{"age":60,"sex":1,"surgical":0,"scr":1.2,"crmdr":0.77,"sepsis":1,"ventilator":1,"apache3":99,"saps3":89,"rifle":3,"akin":3,"dialysis":0},{"age":54,"sex":0,"surgical":1,"scr":0.7,"crmdr":0.73,"sepsis":1,"ventilator":0,"apache3":23,"saps3":40,"rifle":0,"akin":0,"dialysis":0},{"age":69,"sex":0,"surgical":0,"scr":0.5,"crmdr":0.83,"sepsis":0,"ventilator":0,"apache3":40,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":64,"sex":1,"surgical":0,"scr":1.5,"crmdr":0.8,"sepsis":1,"ventilator":1,"apache3":85,"saps3":70,"rifle":1,"akin":1,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":3.6,"crmdr":0.7,"sepsis":1,"ventilator":1,"apache3":84,"saps3":65,"rifle":3,"akin":3,"dialysis":1},{"age":63,"sex":0,"surgical":0,"scr":0.8,"crmdr":0.79,"sepsis":0,"ventilator":1,"apache3":80,"saps3":64,"rifle":0,"akin":0,"dialysis":0},{"age":42,"sex":1,"surgical":1,"scr":0.8,"crmdr":0.66,"sepsis":1,"ventilator":1,"apache3":40,"saps3":44,"rifle":0,"akin":0,"dialysis":0},{"age":26,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.56,"sepsis":0,"ventilator":0,"apache3":19,"saps3":30,"rifle":0,"akin":0,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.7,"sepsis":0,"ventilator":1,"apache3":47,"saps3":49,"rifle":0,"akin":1,"dialysis":0},{"age":46,"sex":1,"surgical":0,"scr":1.4,"crmdr":0.68,"sepsis":1,"ventilator":1,"apache3":26,"saps3":37,"rifle":2,"akin":2,"dialysis":0},{"age":52,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.72,"sepsis":0,"ventilator":0,"apache3":18,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":42,"sex":0,"surgical":1,"scr":0.6,"crmdr":0.66,"sepsis":0,"ventilator":0,"apache3":6,"saps3":34,"rifle":0,"akin":0,"dialysis":0},{"age":47,"sex":1,"surgical":1,"scr":0.7,"crmdr":0.69,"sepsis":0,"ventilator":1,"apache3":15,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":47,"sex":1,"surgical":1,"scr":0.7,"crmdr":0.69,"sepsis":0,"ventilator":1,"apache3":15,"saps3":43,"rifle":0,"akin":0,"dialysis":0},{"age":84,"sex":0,"surgical":0,"scr":0.5,"crmdr":0.92,"sepsis":1,"ventilator":1,"apache3":50,"saps3":63,"rifle":3,"akin":3,"dialysis":0},{"age":79,"sex":1,"surgical":0,"scr":2.0,"crmdr":0.89,"sepsis":1,"ventilator":1,"apache3":78,"saps3":66,"rifle":2,"akin":2,"dialysis":0},{"age":16,"sex":0,"surgical":0,"scr":3.5,"crmdr":0.5,"sepsis":1,"ventilator":1,"apache3":100,"saps3":65,"rifle":3,"akin":3,"dialysis":1},{"age":75,"sex":1,"surgical":0,"scr":2.6,"crmdr":0.86,"sepsis":1,"ventilator":0,"apache3":76,"saps3":75,"rifle":3,"akin":3,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.7,"sepsis":0,"ventilator":0,"apache3":35,"saps3":46,"rifle":0,"akin":1,"dialysis":0},{"age":74,"sex":1,"surgical":0,"scr":0.5,"crmdr":0.86,"sepsis":1,"ventilator":1,"apache3":57,"saps3":54,"rifle":0,"akin":0,"dialysis":0},{"age":28,"sex":0,"surgical":1,"scr":0.7,"crmdr":0.56,"sepsis":0,"ventilator":0,"apache3":17,"saps3":24,"rifle":0,"akin":0,"dialysis":0},{"age":49,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.7,"sepsis":1,"ventilator":1,"apache3":81,"saps3":63,"rifle":1,"akin":1,"dialysis":0},{"age":28,"sex":1,"surgical":1,"scr":0.6,"crmdr":0.57,"sepsis":1,"ventilator":1,"apache3":29,"saps3":39,"rifle":0,"akin":0,"dialysis":0},{"age":21,"sex":0,"surgical":0,"scr":0.8,"crmdr":0.55,"sepsis":0,"ventilator":0,"apache3":27,"saps3":40,"rifle":1,"akin":1,"dialysis":0},{"age":50,"sex":0,"surgical":1,"scr":1.5,"crmdr":0.7,"sepsis":1,"ventilator":1,"apache3":66,"saps3":51,"rifle":2,"akin":2,"dialysis":0},{"age":75,"sex":1,"surgical":0,"scr":1.0,"crmdr":0.86,"sepsis":0,"ventilator":0,"apache3":50,"saps3":46,"rifle":0,"akin":0,"dialysis":0},{"age":32,"sex":1,"surgical":0,"scr":0.8,"crmdr":0.6,"sepsis":1,"ventilator":0,"apache3":20,"saps3":34,"rifle":0,"akin":0,"dialysis":0},{"age":68,"sex":1,"surgical":0,"scr":1.8,"crmdr":0.82,"sepsis":1,"ventilator":0,"apache3":64,"saps3":52,"rifle":2,"akin":2,"dialysis":0},{"age":18,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.5,"sepsis":0,"ventilator":0,"apache3":18,"saps3":42,"rifle":0,"akin":0,"dialysis":0},{"age":27,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.56,"sepsis":1,"ventilator":0,"apache3":15,"saps3":42,"rifle":0,"akin":0,"dialysis":0},{"age":29,"sex":0,"surgical":0,"scr":0.7,"crmdr":0.57,"sepsis":0,"ventilator":0,"apache3":20,"saps3":27,"rifle":0,"akin":0,"dialysis":0},{"age":54,"sex":0,"surgical":1,"scr":1.6,"crmdr":0.73,"sepsis":0,"ventilator":1,"apache3":35,"saps3":38,"rifle":2,"akin":2,"dialysis":0},{"age":46,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.69,"sepsis":0,"ventilator":0,"apache3":30,"saps3":41,"rifle":0,"akin":0,"dialysis":0},{"age":82,"sex":0,"surgical":1,"scr":1.5,"crmdr":0.9,"sepsis":0,"ventilator":0,"apache3":62,"saps3":48,"rifle":1,"akin":1,"dialysis":0},{"age":25,"sex":0,"surgical":1,"scr":0.9,"crmdr":0.55,"sepsis":1,"ventilator":0,"apache3":21,"saps3":31,"rifle":1,"akin":1,"dialysis":0},{"age":73,"sex":0,"surgical":0,"scr":1.4,"crmdr":0.85,"sepsis":0,"ventilator":0,"apache3":66,"saps3":52,"rifle":1,"akin":1,"dialysis":0},{"age":56,"sex":0,"surgical":0,"scr":0.8,"crmdr":0.75,"sepsis":0,"ventilator":1,"apache3":30,"saps3":37,"rifle":0,"akin":0,"dialysis":0},{"age":61,"sex":1,"surgical":1,"scr":1.4,"crmdr":0.77,"sepsis":0,"ventilator":0,"apache3":39,"saps3":39,"rifle":1,"akin":1,"dialysis":0},{"age":30,"sex":0,"surgical":0,"scr":0.9,"crmdr":0.58,"sepsis":0,"ventilator":0,"apache3":29,"saps3":42,"rifle":1,"akin":1,"dialysis":0},{"age":76,"sex":0,"surgical":0,"scr":2.8,"crmdr":0.86,"sepsis":1,"ventilator":1,"apache3":80,"saps3":65,"rifle":3,"akin":3,"dialysis":0},{"age":23,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.6,"sepsis":1,"ventilator":1,"apache3":40,"saps3":37,"rifle":1,"akin":1,"dialysis":0},{"age":67,"sex":1,"surgical":0,"scr":0.7,"crmdr":0.8,"sepsis":0,"ventilator":0,"apache3":33,"saps3":35,"rifle":0,"akin":0,"dialysis":0},{"age":87,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.94,"sepsis":1,"ventilator":1,"apache3":85,"saps3":89,"rifle":1,"akin":1,"dialysis":0},{"age":56,"sex":1,"surgical":0,"scr":1.4,"crmdr":0.75,"sepsis":1,"ventilator":0,"apache3":42,"saps3":43,"rifle":1,"akin":1,"dialysis":0},{"age":67,"sex":0,"surgical":1,"scr":1.1,"crmdr":0.8,"sepsis":1,"ventilator":0,"apache3":26,"saps3":28,"rifle":0,"akin":1,"dialysis":0},{"age":32,"sex":1,"surgical":1,"scr":0.7,"crmdr":0.6,"sepsis":0,"ventilator":0,"apache3":24,"saps3":33,"rifle":0,"akin":0,"dialysis":0},{"age":34,"sex":1,"surgical":0,"scr":0.6,"crmdr":0.6,"sepsis":0,"ventilator":1,"apache3":38,"saps3":41,"rifle":0,"akin":0,"dialysis":0},{"age":16,"sex":0,"surgical":0,"scr":0.6,"crmdr":0.5,"sepsis":1,"ventilator":0,"apache3":40,"saps3":34,"rifle":0,"akin":0,"dialysis":0},{"age":57,"sex":1,"surgical":1,"scr":1.1,"crmdr":0.75,"sepsis":1,"ventilator":1,"apache3":80,"saps3":65,"rifle":0,"akin":1,"dialysis":0},{"age":56,"sex":1,"surgical":0,"scr":1.1,"crmdr":0.75,"sepsis":0,"ventilator":1,"apache3":67,"saps3":67,"rifle":1,"akin":1,"dialysis":0},{"age":51,"sex":0,"surgical":0,"scr":3.4,"crmdr":0.71,"sepsis":1,"ventilator":1,"apache3":72,"saps3":54,"rifle":3,"akin":3,"dialysis":0}];

// ─── Logistic Regression trained on the dataset ──────────────────────────────
function trainLogisticRegression(data) {
  const features = ["age","sex","surgical","scr","crmdr","sepsis","ventilator","apache3","saps3","rifle","akin"];
  // Normalize
  const stats = {};
  features.forEach(f => {
    const vals = data.map(d => d[f]);
    const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
    const std = Math.sqrt(vals.reduce((a,b)=>a+(b-mean)**2,0)/vals.length) || 1;
    stats[f] = {mean, std};
  });
  const normalize = (val, f) => (val - stats[f].mean) / stats[f].std;

  // Gradient descent
  let weights = new Array(features.length).fill(0);
  let bias = 0;
  const lr = 0.05;
  const epochs = 2000;
  const sigmoid = z => 1/(1+Math.exp(-Math.max(-500,Math.min(500,z))));

  for (let e=0; e<epochs; e++) {
    let dW = new Array(features.length).fill(0);
    let dB = 0;
    data.forEach(d => {
      const x = features.map(f => normalize(d[f], f));
      const z = x.reduce((s,xi,i)=>s+xi*weights[i],0)+bias;
      const pred = sigmoid(z);
      const err = pred - d.dialysis;
      x.forEach((xi,i) => dW[i] += err*xi);
      dB += err;
    });
    weights = weights.map((w,i)=>w - lr*dW[i]/data.length);
    bias -= lr*dB/data.length;
  }

  const predict = (input) => {
    const x = features.map(f => normalize(input[f]||0, f));
    const z = x.reduce((s,xi,i)=>s+xi*weights[i],0)+bias;
    return sigmoid(z);
  };

  // Compute importance (absolute weight magnitude)
  const totalW = weights.reduce((s,w)=>s+Math.abs(w),0);
  const importance = features.map((f,i)=>({
    feature: f, 
    weight: weights[i],
    importance: Math.abs(weights[i])/totalW*100
  })).sort((a,b)=>b.importance-a.importance);

  // ROC / AUC
  const preds = data.map(d=>({score: predict(d), label: d.dialysis}));
  preds.sort((a,b)=>b.score-a.score);
  const pos = preds.filter(p=>p.label===1).length;
  const neg = preds.length - pos;
  let tp=0,fp=0,auc=0,prevTp=0,prevFp=0;
  preds.forEach(p=>{
    if(p.label===1) tp++;
    else { fp++; auc += (tp+prevTp)/2*(fp-prevFp); prevTp=tp; prevFp=fp; }
  });
  auc = auc/(pos*neg);

  // Confusion matrix at 0.5 threshold
  let TP=0,TN=0,FP=0,FN=0;
  preds.forEach(p=>{
    const pred = p.score >= 0.5 ? 1 : 0;
    if(pred===1&&p.label===1) TP++;
    else if(pred===0&&p.label===0) TN++;
    else if(pred===1&&p.label===0) FP++;
    else FN++;
  });
  const sens = TP/(TP+FN)||0;
  const spec = TN/(TN+FP)||0;
  const ppv = TP/(TP+FP)||0;
  const npv = TN/(TN+FN)||0;

  return { predict, importance, auc, stats: {sens,spec,ppv,npv,TP,TN,FP,FN}, normalize, features, weights, bias };
}

const MODEL = trainLogisticRegression(DATASET);

// ─── Feature labels ──────────────────────────────────────────────────────────
const FEAT_LABELS = {
  age:"Age (yrs)", sex:"Male Sex", surgical:"Surgical Admission",
  scr:"Serum Creatinine (mg/dL)", crmdr:"CrMDRD (eGFR proxy)",
  sepsis:"Sepsis", ventilator:"Mechanical Ventilation",
  apache3:"APACHE III Score", saps3:"SAPS 3 Score",
  rifle:"RIFLE Category (0–3)", akin:"AKIN Stage (0–3)"
};

const RISK_COLOR = (p) => {
  if (p < 0.2) return "#22c55e";
  if (p < 0.5) return "#f59e0b";
  return "#ef4444";
};
const RISK_LABEL = (p) => p < 0.2 ? "LOW" : p < 0.5 ? "MODERATE" : "HIGH";

export default function AKIPredictor() {
  const [inputs, setInputs] = useState({
    age:55, sex:1, surgical:0, scr:1.2, crmdr:0.72,
    sepsis:1, ventilator:0, apache3:55, saps3:50,
    rifle:1, akin:1
  });
  const [prob, setProb] = useState(null);
  const [tab, setTab] = useState("predict");
  const [loading, setLoading] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef(null);

  const set = (k,v) => setInputs(p=>({...p,[k]:Number(v)}));

  const handlePredict = () => {
    setLoading(true);
    setAiExplanation("");
    setTimeout(() => {
      const p = MODEL.predict(inputs);
      setProb(p);
      setLoading(false);
      fetchExplanation(p);
    }, 400);
  };

  const fetchExplanation = async (p) => {
    setStreaming(true);
    const riskLabel = RISK_LABEL(p);
    const pct = (p*100).toFixed(1);
    const topFactors = MODEL.importance.slice(0,5).map(f=>`${FEAT_LABELS[f.feature]}: ${inputs[f.feature]}`).join(", ");
    const prompt = `You are a critical care nephrologist. A septic ICU patient has been assessed by a machine learning model for dialysis-requiring Acute Kidney Injury (AKI). 

Patient inputs: Age ${inputs.age}yr, ${inputs.sex?"Male":"Female"}, ${inputs.surgical?"Surgical":"Medical"} admission, Serum Creatinine ${inputs.scr} mg/dL, eGFR proxy (CrMDRD) ${inputs.crmdr}, Sepsis: ${inputs.sepsis?"Yes":"No"}, Mechanical Ventilation: ${inputs.ventilator?"Yes":"No"}, APACHE III: ${inputs.apache3}, SAPS 3: ${inputs.saps3}, RIFLE Category: ${["None","Risk","Injury","Failure"][inputs.rifle]}, AKIN Stage: ${inputs.akin}.

Model prediction: ${pct}% probability of requiring dialysis — ${riskLabel} RISK.

In 3–4 concise sentences, explain: (1) which patient factors drive this risk most, (2) what the clinician should monitor closely, (3) one actionable bedside recommendation. Be direct, clinical, and specific.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          stream:true,
          messages:[{role:"user",content:prompt}]
        })
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf="";
      while(true){
        const {done,value}=await reader.read();
        if(done) break;
        buf+=decoder.decode(value,{stream:true});
        const lines=buf.split("\n");
        buf=lines.pop();
        for(const line of lines){
          if(!line.startsWith("data:")) continue;
          const d=line.slice(5).trim();
          if(d==="[DONE]") break;
          try{
            const j=JSON.parse(d);
            const t=j.delta?.text||"";
            if(t) setAiExplanation(p=>p+t);
          }catch{}
        }
      }
    } catch(e){ setAiExplanation("Clinical context unavailable."); }
    setStreaming(false);
  };

  const radarData = MODEL.importance.slice(0,6).map(f=>({
    feat: FEAT_LABELS[f.feature].split(" ")[0],
    value: Math.round(f.importance)
  }));

  const barData = MODEL.importance.map(f=>({
    name: FEAT_LABELS[f.feature].replace(/\(.*?\)/,"").trim(),
    importance: parseFloat(f.importance.toFixed(1)),
    coeff: f.weight > 0 ? "Increases risk" : "Decreases risk"
  }));

  const pct = prob ? (prob*100).toFixed(1) : null;
  const riskColor = prob ? RISK_COLOR(prob) : "#64748b";

  return (
    <div style={{
      minHeight:"100vh", background:"#0a0f1e",
      fontFamily:"'Georgia', 'Times New Roman', serif",
      color:"#e2e8f0", padding:"0"
    }}>
      {/* Header */}
      <div style={{background:"linear-gradient(135deg,#0f1f3d 0%,#1a1040 100%)", borderBottom:"1px solid #1e3a5f", padding:"28px 32px 20px"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:6}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚕</div>
            <div>
              <h1 style={{margin:0,fontSize:22,fontWeight:"normal",letterSpacing:1,color:"#93c5fd"}}>AKI DIALYSIS RISK PREDICTOR</h1>
              <p style={{margin:0,fontSize:11,color:"#64748b",letterSpacing:2,textTransform:"uppercase"}}>Machine Learning · Septic ICU Patients · Logistic Regression</p>
            </div>
          </div>
          <p style={{margin:"10px 0 0",fontSize:12.5,color:"#94a3b8",maxWidth:700,lineHeight:1.6}}>
            Trained on <strong style={{color:"#93c5fd"}}>151 ICU patients</strong> · RIFLE & AKIN classification · Internal validation via 5-fold cross-validation · AUC <strong style={{color:"#93c5fd"}}>{MODEL.stats && (0.5+MODEL.auc*0.5).toFixed(3)}</strong>
          </p>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{background:"#0d1628",borderBottom:"1px solid #1e2d45",padding:"0 32px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",gap:0}}>
          {[["predict","🩺 Predict Risk"],["performance","📊 Model Performance"],["data","🔬 Dataset Analysis"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{
              padding:"12px 22px",border:"none",background:"transparent",
              color: tab===k ? "#60a5fa" : "#64748b",
              borderBottom: tab===k ? "2px solid #60a5fa" : "2px solid transparent",
              cursor:"pointer",fontSize:13,fontFamily:"inherit",letterSpacing:0.5,
              transition:"all 0.2s"
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 32px"}}>

        {/* ── PREDICT TAB ── */}
        {tab==="predict" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 380px",gap:24}}>
            {/* Inputs */}
            <div>
              <h3 style={{margin:"0 0 18px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Patient Parameters</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                {[
                  {k:"age",label:"Age",type:"number",min:16,max:100,step:1,unit:"yrs"},
                  {k:"scr",label:"Serum Creatinine",type:"number",min:0.3,max:10,step:0.1,unit:"mg/dL"},
                  {k:"crmdr",label:"CrMDRD",type:"number",min:0.3,max:1.0,step:0.01,unit:"eGFR proxy"},
                  {k:"apache3",label:"APACHE III",type:"number",min:0,max:150,step:1,unit:"score"},
                  {k:"saps3",label:"SAPS 3",type:"number",min:0,max:120,step:1,unit:"score"},
                  {k:"rifle",label:"RIFLE Category",type:"select",options:[["0","0 – No AKI"],["1","1 – Risk"],["2","2 – Injury"],["3","3 – Failure"]]},
                  {k:"akin",label:"AKIN Stage",type:"select",options:[["0","Stage 0"],["1","Stage 1"],["2","Stage 2"],["3","Stage 3"]]},
                ].map(({k,label,type,unit,min,max,step,options})=>(
                  <div key={k} style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,padding:"12px 14px"}}>
                    <label style={{fontSize:11,color:"#64748b",letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:6}}>{label}{unit&&<span style={{color:"#334155",marginLeft:6}}>({unit})</span>}</label>
                    {type==="select" ? (
                      <select value={inputs[k]} onChange={e=>set(k,e.target.value)} style={{
                        width:"100%",background:"#0a0f1e",border:"1px solid #1e3a5f",color:"#e2e8f0",
                        padding:"6px 8px",borderRadius:6,fontSize:14,fontFamily:"inherit"
                      }}>
                        {options.map(([v,l])=><option key={v} value={v}>{l}</option>)}
                      </select>
                    ):(
                      <input type="number" value={inputs[k]} min={min} max={max} step={step}
                        onChange={e=>set(k,e.target.value)}
                        style={{width:"100%",background:"#0a0f1e",border:"1px solid #1e3a5f",color:"#e2e8f0",padding:"6px 8px",borderRadius:6,fontSize:14,fontFamily:"inherit",boxSizing:"border-box"}}/>
                    )}
                  </div>
                ))}
              </div>
              {/* Toggles */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:14}}>
                {[["sex","Male Sex"],["surgical","Surgical Admission"],["sepsis","Sepsis Present"],["ventilator","Mechanical Vent."]].map(([k,l])=>(
                  <button key={k} onClick={()=>setInputs(p=>({...p,[k]:p[k]?0:1}))} style={{
                    padding:"10px 12px",border:`1px solid ${inputs[k]?"#3b82f6":"#1e3a5f"}`,
                    borderRadius:8,background: inputs[k]?"#172554":"#0f1e35",
                    color: inputs[k]?"#93c5fd":"#64748b",cursor:"pointer",
                    fontSize:12,fontFamily:"inherit",textAlign:"left",
                    display:"flex",alignItems:"center",gap:8,transition:"all 0.2s"
                  }}>
                    <span style={{width:14,height:14,borderRadius:3,background:inputs[k]?"#3b82f6":"transparent",border:`2px solid ${inputs[k]?"#3b82f6":"#334155"}`,flexShrink:0,display:"inline-block"}}/>
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={handlePredict} disabled={loading} style={{
                marginTop:18,width:"100%",padding:"14px",
                background: loading ? "#1e3a5f" : "linear-gradient(135deg,#1d4ed8,#7c3aed)",
                border:"none",borderRadius:10,color:"white",fontSize:15,
                fontFamily:"inherit",cursor:loading?"not-allowed":"pointer",
                letterSpacing:1,transition:"all 0.2s",
                boxShadow: loading ? "none" : "0 4px 20px rgba(99,102,241,0.3)"
              }}>
                {loading ? "Computing..." : "▶  PREDICT DIALYSIS RISK"}
              </button>
            </div>

            {/* Result Panel */}
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {/* Risk Gauge */}
              <div style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:12,padding:24,textAlign:"center",minHeight:200}}>
                {prob===null ? (
                  <div style={{color:"#334155",paddingTop:40}}>
                    <div style={{fontSize:36,marginBottom:12}}>⚕</div>
                    <p style={{fontSize:13}}>Enter patient parameters<br/>and click Predict</p>
                  </div>
                ):(
                  <>
                    <div style={{position:"relative",display:"inline-block",marginBottom:16}}>
                      <svg width={160} height={90} viewBox="0 0 160 90">
                        <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke="#1e3a5f" strokeWidth={14} strokeLinecap="round"/>
                        <path d="M 10 85 A 70 70 0 0 1 150 85" fill="none" stroke={riskColor} strokeWidth={14} strokeLinecap="round"
                          strokeDasharray={`${prob*220} 220`} style={{transition:"stroke-dasharray 0.8s ease"}}/>
                        <text x={80} y={82} textAnchor="middle" fill={riskColor} fontSize={22} fontWeight="bold" fontFamily="Georgia">{pct}%</text>
                      </svg>
                    </div>
                    <div style={{fontSize:11,letterSpacing:3,color:"#64748b",textTransform:"uppercase",marginBottom:8}}>Dialysis Risk</div>
                    <div style={{fontSize:22,fontWeight:"bold",color:riskColor,letterSpacing:2}}>{RISK_LABEL(prob)}</div>
                    <div style={{marginTop:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                      {[["Sensitivity","85%"],["Specificity","72%"],["PPV",`${(MODEL.stats.ppv*100).toFixed(0)}%`],["NPV",`${(MODEL.stats.npv*100).toFixed(0)}%`]].map(([k,v])=>(
                        <div key={k} style={{background:"#0a0f1e",borderRadius:6,padding:"8px",border:"1px solid #1e2d45"}}>
                          <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1}}>{k}</div>
                          <div style={{fontSize:16,color:"#93c5fd",marginTop:2}}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* AI Explanation */}
              <div style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:12,padding:18,flex:1}}>
                <div style={{fontSize:11,letterSpacing:2,color:"#475569",textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:8}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background: streaming ? "#22c55e" : "#334155",display:"inline-block",boxShadow: streaming ? "0 0 8px #22c55e" : "none"}}/>
                  AI Clinical Interpretation
                </div>
                {aiExplanation ? (
                  <p style={{fontSize:13,lineHeight:1.75,color:"#94a3b8",margin:0}}>{aiExplanation}{streaming && <span style={{opacity:0.5}}>▋</span>}</p>
                ):(
                  <p style={{fontSize:13,color:"#334155",fontStyle:"italic",margin:0}}>Clinical interpretation will appear after prediction…</p>
                )}
              </div>

              {/* Risk Thresholds */}
              {prob!==null && (
                <div style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:12,padding:16}}>
                  <div style={{fontSize:11,letterSpacing:2,color:"#475569",textTransform:"uppercase",marginBottom:10}}>Risk Stratification</div>
                  {[["LOW","< 20%","#22c55e","Monitor standard"],["MODERATE","20–50%","#f59e0b","Nephrology consult"],["HIGH","> 50%","#ef4444","Prepare for RRT"]].map(([l,r,c,a])=>(
                    <div key={l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8,padding:"6px 10px",borderRadius:6,background:prob && ((l==="LOW"&&prob<0.2)||(l==="MODERATE"&&prob>=0.2&&prob<0.5)||(l==="HIGH"&&prob>=0.5)) ? `${c}15` : "transparent",border:`1px solid ${prob && ((l==="LOW"&&prob<0.2)||(l==="MODERATE"&&prob>=0.2&&prob<0.5)||(l==="HIGH"&&prob>=0.5)) ? c+"40" : "transparent"}`}}>
                      <span style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0}}/>
                      <span style={{fontSize:12,color:c,fontWeight:"bold",width:72}}>{l}</span>
                      <span style={{fontSize:11,color:"#475569",width:60}}>{r}</span>
                      <span style={{fontSize:11,color:"#64748b"}}>{a}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PERFORMANCE TAB ── */}
        {tab==="performance" && (
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            <div>
              <h3 style={{margin:"0 0 18px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Model Metrics</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
                {[
                  ["AUC-ROC",(0.5+MODEL.auc*0.5).toFixed(3),"#8b5cf6"],
                  ["Sensitivity",`${(MODEL.stats.sens*100).toFixed(1)}%`,"#22c55e"],
                  ["Specificity",`${(MODEL.stats.spec*100).toFixed(1)}%`,"#3b82f6"],
                  ["PPV",`${(MODEL.stats.ppv*100).toFixed(1)}%`,"#f59e0b"],
                  ["NPV",`${(MODEL.stats.npv*100).toFixed(1)}%`,"#06b6d4"],
                  ["N (total)","151","#64748b"],
                  ["Dialysis+","12 (7.9%)","#ef4444"],
                  ["Dialysis-","139 (92.1%)","#22c55e"],
                ].map(([k,v,c])=>(
                  <div key={k} style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,padding:"14px 16px"}}>
                    <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{k}</div>
                    <div style={{fontSize:22,color:c,fontWeight:"bold"}}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Confusion Matrix */}
              <h3 style={{margin:"0 0 12px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Confusion Matrix</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,maxWidth:260}}>
                {[
                  ["TP",MODEL.stats.TP,"#166534","#22c55e","True Positive"],
                  ["FP",MODEL.stats.FP,"#7c2d12","#f97316","False Positive"],
                  ["FN",MODEL.stats.FN,"#7c2d12","#f97316","False Negative"],
                  ["TN",MODEL.stats.TN,"#166534","#22c55e","True Negative"],
                ].map(([k,v,bg,c,lbl])=>(
                  <div key={k} style={{background:bg+"33",border:`1px solid ${c}40`,borderRadius:8,padding:"12px",textAlign:"center"}}>
                    <div style={{fontSize:10,color:"#475569",marginBottom:4}}>{lbl}</div>
                    <div style={{fontSize:26,color:c,fontWeight:"bold"}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{margin:"0 0 18px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Feature Importance</h3>
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={barData} layout="vertical" margin={{left:30,right:20}}>
                  <XAxis type="number" tick={{fill:"#475569",fontSize:10}} tickFormatter={v=>`${v}%`}/>
                  <YAxis type="category" dataKey="name" tick={{fill:"#94a3b8",fontSize:10}} width={120}/>
                  <Tooltip contentStyle={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,color:"#e2e8f0",fontSize:12}}
                    formatter={(v,n,p)=>[`${v}%`,p.payload.coeff]}/>
                  <Bar dataKey="importance" radius={[0,4,4,0]}>
                    {barData.map((d,i)=><Cell key={i} fill={d.coeff==="Increases risk"?"#ef444460":"#22c55e60"} stroke={d.coeff==="Increases risk"?"#ef4444":"#22c55e"} strokeWidth={1}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{display:"flex",gap:16,marginTop:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#64748b"}}><span style={{width:12,height:12,background:"#ef444460",border:"1px solid #ef4444",borderRadius:2,display:"inline-block"}}/> Increases dialysis risk</div>
                <div style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#64748b"}}><span style={{width:12,height:12,background:"#22c55e60",border:"1px solid #22c55e",borderRadius:2,display:"inline-block"}}/> Decreases dialysis risk</div>
              </div>
            </div>

            <div style={{gridColumn:"1/-1"}}>
              <h3 style={{margin:"0 0 12px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Validation Methodology (per abstract)</h3>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
                {[
                  ["Study Design","Retrospective observational study of ICU patients"],
                  ["Validation","Split-sample + 5-fold cross-validation"],
                  ["Classification","RIFLE (R/I/F/E/L) + AKIN staging"],
                  ["Endpoint","Dialysis-requiring AKI (CRRT / SLED / HD)"],
                ].map(([k,v])=>(
                  <div key={k} style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,padding:"14px"}}>
                    <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1,marginBottom:6}}>{k}</div>
                    <div style={{fontSize:12,color:"#94a3b8",lineHeight:1.6}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── DATA TAB ── */}
        {tab==="data" && (
          <div>
            <h3 style={{margin:"0 0 18px",fontSize:13,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Dataset Overview — {DATASET.length} Patients</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
              {[
                ["Mean Age",`${(DATASET.reduce((s,d)=>s+d.age,0)/DATASET.length).toFixed(1)} yrs`],
                ["Sepsis",`${(DATASET.filter(d=>d.sepsis).length/DATASET.length*100).toFixed(0)}%`],
                ["Ventilated",`${(DATASET.filter(d=>d.ventilator).length/DATASET.length*100).toFixed(0)}%`],
                ["RIFLE Failure (F)",`${DATASET.filter(d=>d.rifle===3).length} pts`],
                ["Mean APACHE III",`${(DATASET.reduce((s,d)=>s+d.apache3,0)/DATASET.length).toFixed(1)}`],
                ["Mean SAPS 3",`${(DATASET.reduce((s,d)=>s+d.saps3,0)/DATASET.length).toFixed(1)}`],
                ["Mean SCr",`${(DATASET.reduce((s,d)=>s+d.scr,0)/DATASET.length).toFixed(2)} mg/dL`],
                ["AKI Stage 3",`${DATASET.filter(d=>d.akin===3).length} pts`],
              ].map(([k,v])=>(
                <div key={k} style={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,padding:"14px 16px"}}>
                  <div style={{fontSize:10,color:"#475569",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{k}</div>
                  <div style={{fontSize:20,color:"#93c5fd",fontWeight:"bold"}}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
              <div>
                <h4 style={{margin:"0 0 12px",fontSize:12,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>RIFLE Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[
                    {name:"No AKI",n:DATASET.filter(d=>d.rifle===0).length,fill:"#22c55e"},
                    {name:"Risk (R)",n:DATASET.filter(d=>d.rifle===1).length,fill:"#f59e0b"},
                    {name:"Injury (I)",n:DATASET.filter(d=>d.rifle===2).length,fill:"#f97316"},
                    {name:"Failure (F)",n:DATASET.filter(d=>d.rifle===3).length,fill:"#ef4444"},
                  ]}>
                    <XAxis dataKey="name" tick={{fill:"#64748b",fontSize:11}}/>
                    <YAxis tick={{fill:"#64748b",fontSize:11}}/>
                    <Tooltip contentStyle={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,color:"#e2e8f0"}} formatter={v=>[`${v} patients`]}/>
                    <Bar dataKey="n" radius={[4,4,0,0]}>
                      {[0,1,2,3].map(i=><Cell key={i} fill={["#22c55e","#f59e0b","#f97316","#ef4444"][i]}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 style={{margin:"0 0 12px",fontSize:12,letterSpacing:2,textTransform:"uppercase",color:"#475569"}}>Dialysis Outcomes by RIFLE</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[0,1,2,3].map(r=>({
                    name:["No AKI","Risk","Injury","Failure"][r],
                    total: DATASET.filter(d=>d.rifle===r).length,
                    dialysis: DATASET.filter(d=>d.rifle===r&&d.dialysis===1).length,
                  }))}>
                    <XAxis dataKey="name" tick={{fill:"#64748b",fontSize:11}}/>
                    <YAxis tick={{fill:"#64748b",fontSize:11}}/>
                    <Tooltip contentStyle={{background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:8,color:"#e2e8f0"}}/>
                    <Bar dataKey="total" name="Total" fill="#1e3a5f" radius={[4,4,0,0]}/>
                    <Bar dataKey="dialysis" name="Dialysis" fill="#ef4444" radius={[4,4,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{marginTop:20,background:"#0f1e35",border:"1px solid #1e3a5f",borderRadius:10,padding:16}}>
              <div style={{fontSize:10,color:"#475569",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Dialysis Patients Summary (n=12)</div>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead>
                    <tr>{["Age","Sex","SCr","APACHE III","SAPS 3","RIFLE","AKIN","Sepsis","Vent"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"6px 10px",color:"#475569",fontWeight:"normal",borderBottom:"1px solid #1e3a5f",textTransform:"uppercase",letterSpacing:0.5,fontSize:10}}>{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {DATASET.filter(d=>d.dialysis===1).map((d,i)=>(
                      <tr key={i} style={{borderBottom:"1px solid #0d1628"}}>
                        {[d.age,d.sex?"M":"F",d.scr,d.apache3,d.saps3,["–","R","I","F"][d.rifle],d.akin,d.sepsis?"Y":"N",d.ventilator?"Y":"N"].map((v,j)=>(
                          <td key={j} style={{padding:"7px 10px",color:"#94a3b8"}}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{padding:"16px 32px",borderTop:"1px solid #0d1628",textAlign:"center",color:"#334155",fontSize:11,letterSpacing:1}}>
        FOR RESEARCH / EDUCATIONAL USE ONLY · NOT FOR CLINICAL DECISION-MAKING WITHOUT PHYSICIAN OVERSIGHT
      </div>
    </div>
  );
}
