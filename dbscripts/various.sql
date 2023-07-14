/* counts by day */
SELECT 
ymd,
COUNT(DISTINCT case_number) AS daily_crimes
FROM corecrimedata
GROUP BY ymd;

/* counts by month */
SELECT 
corecrimedata.`year`,
corecrimedata.`month`,
COUNT(DISTINCT case_number) AS monthly_crimes
FROM corecrimedata
GROUP BY corecrimedata.`year`,
corecrimedata.`month`;

/* counts by year */
SELECT
corecrimedata.`year`,
COUNT(DISTINCT case_number) AS yearly_crimes
FROM corecrimedata
GROUP BY corecrimedata.`year`;