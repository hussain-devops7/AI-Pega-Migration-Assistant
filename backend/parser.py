import pandas as pd

def parse_inventory(file_path):
    df = pd.read_csv(file_path)

    return {
        "rows": len(df),
        "columns": list(df.columns),
        "data": df.to_dict(orient="records")
    }
