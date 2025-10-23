import React, { useState } from 'react';

interface ChartData {
    label: string;
    value: number;
}

interface BarChartProps {
    data: ChartData[];
    title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);
    const maxValue = Math.max(...data.map(d => d.value), 1);
    const chartHeight = 200;
    const barWidth = 30;
    const barMargin = 25;
    const chartWidth = data.length * (barWidth + barMargin);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
            <div className="mt-4 overflow-x-auto pb-2">
                <svg width={chartWidth} height={chartHeight + 40} className="font-sans">
                    <g transform="translate(0, 10)">
                        {data.map((d, i) => {
                            const barHeight = maxValue > 0 ? (d.value / maxValue) * chartHeight : 0;
                            const x = i * (barWidth + barMargin);
                            const y = chartHeight - barHeight;
                            const isHovered = hoveredBar === d.label;

                            return (
                                <g key={d.label} className="cursor-pointer" onMouseEnter={() => setHoveredBar(d.label)} onMouseLeave={() => setHoveredBar(null)}>
                                    <rect
                                        x={x}
                                        y={y}
                                        width={barWidth}
                                        height={barHeight}
                                        fill={isHovered ? '#2563eb' : '#60a5fa'}
                                        rx="4"
                                        ry="4"
                                        className="transition-all duration-200"
                                    />
                                    <text
                                        x={x + barWidth / 2}
                                        y={y - 5}
                                        textAnchor="middle"
                                        className={`text-xs font-bold fill-gray-700 dark:fill-gray-200 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        {d.value}
                                    </text>
                                    <text
                                        x={x + barWidth / 2}
                                        y={chartHeight + 20}
                                        textAnchor="middle"
                                        className="text-xs fill-gray-500 dark:fill-gray-400 font-medium"
                                    >
                                        {d.label}
                                    </text>
                                </g>
                            );
                        })}
                         <line x1="0" y1={chartHeight} x2={chartWidth} y2={chartHeight} stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default BarChart;
